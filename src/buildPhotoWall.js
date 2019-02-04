//var justifiedGallery = require('justifiedGallery');
 var qs = /manifest=(.*)/g.exec(window.location.search);
 var jsonURL = qs[1];
            
 loadURL(jsonURL);

// Load IIIF Images
function loadURL(url) {
    console.log('Reached function with url ' + url);
    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        // Add metadata
        document.getElementById("header-title").innerHTML = data["label"]
        document.getElementById("main-title").innerHTML = data["label"]
        document.getElementById("description").innerHTML = data["description"]
        // Work with JSON data here
        loadImages(data);
        $("#photowall").justifiedGallery({
            rowHeight : 200,
            lastRow : 'nojustify',
            margins : 3
        }).on('jg.complete', function () {
            $('.swipeboxExampleImg').swipebox();
        });
    }).catch(err => {
        // Do something for an error here
        console.log(err);
    });

}

function loadImages(manifest) {
    var photoWall = document.getElementById("photowall");
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
