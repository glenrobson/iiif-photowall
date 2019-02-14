// Import JQuery required for justifiedGallery 
import $ from 'jquery'
import jQuery from 'jquery'
window.jQuery = $;
window.$ = $;
// Import swipebox to do the full screen image view
import swipebox from 'jquery.swipebox';
import 'jquery.swipebox/src/css/swipebox.min.css';
import justifiedGallery from 'justifiedGallery';
import 'justifiedGallery/src/less/justifiedGallery.less';

// Load IIIF Images
export function loadURL(url, config) {
    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        processManifest(data, config);
    }).catch(err => {
        // Do something for an error here
        console.log(err);
    });

}

export function processManifest(manifest, config) {
    addDefaults(config);
    config.showMetadata(manifest, config);
    // Work with JSON data here
    loadImages(manifest, config);
    $("#" + config.div).justifiedGallery({
        rowHeight : 200,
        lastRow : 'nojustify',
        margins : 3
    }).on('jg.complete', function () {
        $('.swipeboxExampleImg').swipebox();
    });
}

function addDefaults(config) {
    if (config.div == null) {
        config.div = 'photowall';
    }
    if (config.showMetadata == null) {
        config.showMetadata = addMetadata;
    }
}

function loadImages(manifest, config) {
    var photoWall = document.getElementById(config.div);
    var canvases = manifest['sequences'][0]['canvases'];
    var imageId;
    for (var i = 0; i < canvases.length; i++) {
        var canvas = canvases[i];
        var a = document.createElement("a");
        photoWall.appendChild(a);
        imageId = canvas['images'][0]['resource']['service']['@id'];
        if (imageId.includes('llgc.org.uk')) { // do max, really need to check the info.json for max e.g: https://damsssl.llgc.org.uk/iiif/2.0/image/1466241/info.json
            a.href = imageId + '/full/max/0/default.jpg';
        } else {
            a.href = imageId + '/full/full/0/default.jpg';
        } 
        a.className = 'swipeboxExampleImg';

        var img = document.createElement("img");
        a.appendChild(img);
        img.src = imageId + '/full/512,/0/default.jpg';
        img.alt = canvas['label'];
    }
}

function addMetadata(manifest, config) {
    // Add metadata
    if (config['label'] != null) {
        for (var i = 0; i < config['label'].length; i++) {
            document.getElementById(config['label'][i]).innerHTML = manifest["label"];
        }
    }    
    if (config['description'] != null) {
        document.getElementById(config['description']).innerHTML = manifest["description"];
    }    
}
