var infoJsonMap = {} 
// Load IIIF Images
export function loadURL(url, config) {
    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        var images = [];
        if (data["@type"] == "sc:Manifest") {
            images = processManifest(data, config);
        } else {
            var manifests = [];
            if (data.manifests != null) {
                manifests = data.manifests;
            } else if (data.members != null) {
                manifests = data.members;
            }
            // Iterate through collection
            for (var i = 0; i < manifests.length; i++) {
                Promise.all(fetch(manifests[i]).then(response => {
                    return response.json();
                }).then(data => {
                    images.concat(processManifest(data, config));
                }).catch(err => {
                    // Do something for an error here
                    console.log(err);
                }));
            }
        }

        // Load images in batches to not overwhelm image server and also 
        // to load the page faster. 
        populateBatch(images, config, 0, config.batch_size);
    }).catch(err => {
        // Do something for an error here
        console.log(err);
    });

}

function populateBatch(images, config, start, batch_size) {
    if (start > images.length) {
        return; // loaded all images
    }
    var imagePromises = [];
    for (var i = start; i < start + batch_size; i++) {
        if (i >= images.length) {
            break;
        }
        var image = images[i];
        imagePromises.push(saveInfoJson(image.image, image.fullImage, image.thumbnail, config.rowHeight));
    }
    Promise.all(imagePromises).then(function(values){
        if (start == 0) {
            $("#" + config.div).justifiedGallery({
                rowHeight : config.rowHeight,
                lastRow : 'nojustify',
                margins : 3,
                thumbnailPath: generateThumbnail
            }).on('jg.complete', function () {
                $('.swipeboxExampleImg').swipebox();
            }).on('jg.resize', function(values) {
                resize(values);
            });
            console.log('finished first promise');
        } else {
            console.log("Promise " + start + ' - ' + (start + batch_size) + " is done");
            $("#" + config.div).justifiedGallery('norewind'); // Can I wait until this is finished?
        }
        populateBatch(images, config, start + batch_size, batch_size); 
    });

}
function resize(resizeEvent) {
    console.log("Resize");
    for (var i = 0; i < resizeEvent.target.children.length; i++) {
        // go through each anchor and update size to match screen
        var a =  resizeEvent.target.children[i];
        a.href = getMaxImage(infoJsonMap[a.id]);
    }
}

export function processManifest(manifest, config) {
    addDefaults(config);
    if (config.showMetadata) {
        config.showMetadata(manifest, config);
    }    
    // Work with JSON data here
    return loadImages(manifest, config);
}

function addDefaults(config) {
    if (config.div == null) {
        config.div = 'photowall';
    }
    if (config.batch_size == null) {
        config.batch_size = 20;
    }    
    if (config.lng == null) {
        config.lng = 'en';
    }    
}

export function getImageUrl(image, width, height, info_json) {
    if (info_json == null) {
        return image.id + '/full/,512/0/default.jpg';
    } else {
        // Work out best size for thumbnail
        // Start with pre-generated
        var minArea = 0;
        var size = null;
        if (info_json.sizes) {
            for (var i = 0; i < info_json.sizes.length; i++) {
                if (info_json.sizes[i].width > width && info_json.sizes[i].height > height) {
                    if (size == null) {
                        size = {};
                        minArea = (info_json.sizes[i].width * info_json.sizes[i].height);
                        size.width = info_json.sizes[i].width;
                        size.height = info_json.sizes[i].height;
                    } else if ((info_json.sizes[i].width * info_json.sizes[i].height) < minArea) {
                        minArea = (info_json.sizes[i].width * info_json.sizes[i].height);
                        size.width = info_json.sizes[i].width;
                        size.height = info_json.sizes[i].height;
                    }
                }
            }
        }    
        if (size != null) {
            return image.id + '/full/' + size.width + ',' + size.height + '/0/default.jpg';
        }    
        // If reached here there isn't a pregenerated image so check for level 0.

        // If not level 0 request the exact size
        //console.log("Requesting exact size " + width + "," + height);
        if (width == 0) {
            return image.id + '/full/,' + height + '/0/default.jpg';
        } else {
            return image.id + '/full/!' + width + ',' + height + '/0/default.jpg';
        }    
    }
}
function generateThumbnail(currentPath, width, height, image) {
    var url = currentPath.split("/");
    // If current image is big enough return this rather than get a new image
    if (url.length > 4) {
        var size = url[url.length - 3];
        var imgWidth = size.split(',')[0];
        var imgHeight = size.split(',')[1];
        if (imgHeight > height) {
            return currentPath;
        }
    }
    var info = infoJsonMap[image.id];
    return getImageUrl(image, width, height, info)
}

function saveInfoJson(imageId, a, img, height) {
    return fetch(imageId + '/info.json').then(response => {
        return response.json();
    }).then(data => {
        infoJsonMap[imageId] = data;
        img.src = generateThumbnail('', 0, height * 2, img);
        a.href = getMaxImage(data);
    }).catch(err => {
        // Do something for an error here
        console.log(err);
    });
}

function getMaxImage(infoJson) {
    var imageId = infoJson['@id'];
    var max = {};
    for (var i = 0; i < infoJson.profile.length; i++) {
        if (typeof infoJson.profile[i] === 'object') {
            if (infoJson.profile[i].maxArea) {
                max.area = infoJson.profile[i].maxArea;
            }
            if (infoJson.profile[i].maxWidth) {
                max.width = infoJson.profile[i].maxWidth;
            }
            if (infoJson.profile[i].maxHeight) {
                max.height = infoJson.profile[i].maxHeight;
            }
        }
    }
    var width = getWidth();
    var height = getHeight();

    if (max.width && max.width < width ||
            max.height && max.height < height || 
                max.area && max.area < (width * height)) {
       // Full image not aviliable so return max
       return imageId + '/full/max/0/default.jpg';
    } else {
        // should check sizes to see if there is a good fit. 
        return imageId + '/full/!' + width + ',' + height + '/0/default.jpg';
    }    
}

function loadImages(manifest, config) {
    var photoWall = document.getElementById(config.div);
    var canvases = manifest['sequences'][0]['canvases'];
    var imageId;
    var images = [];
    var first10 = [];
    for (var i = 0; i < canvases.length; i++) {
        var canvas = canvases[i];
        var a = document.createElement("a");
        photoWall.appendChild(a);
        imageId = canvas['images'][0]['resource']['service']['@id'];
        a.id = imageId;
        a.className = 'swipeboxExampleImg';
        var img = document.createElement("img");
        a.appendChild(img);
        img.alt = getMetadataField(canvas, 'label', config.lng);
        img.id = imageId;
        images.push({ 
            image: imageId, 
            fullImage: a, 
            thumbnail: img
        });
    }
    console.log('Finished Manifest processing');
    return images;
}

// Return the label with the specified lang if aviliable, 
// if not avilable return no language value
// if only value of a different languge return that
export function getMetadataField(json, field, lang) {
    var metadata = json[field];

    if (Array.isArray(metadata)) {
        for (var i = 0; i < metadata.length; i++) {
            if (metadata[i]['@language'] === lang) {
                return metadata[i]['@value'];
            }
        }
        // if haven't found correct lang then return the first one
        return metadata[i]['@value'];
    } else if (typeof metadata === 'object') {
        // if only one languge return wether correct or not
        return metadata['@value'];
    } else { 
        return metadata; 
    }
}

function getWidth() {
  return window.innerWidth;
}

function getHeight() {
  return window.innerHeight;
}
