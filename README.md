# iiif-photowall
iiif-photowall is a lightweight adaptation of [Justified Gallery](http://miromannino.github.io/Justified-Gallery/) to show images in a [IIIF](https://iiif.io) Manifest on a Flickr like photo wall. 

<a href="https://iiif.gdmrdigital.com/iiif-photowall/index.html?manifest=https://damsssl.llgc.org.uk/iiif/2.0/1465719/manifest.json">
  <img src="https://raw.githubusercontent.com/glenrobson/iiif-photowall/master/examples/HMS_Conway.png"/>
</a>

To test your own manifests you can use the following demo site:

https:///iiif.gdmrdigital.com/iiif-photowall/index.html?manifest=https://example.com/manifest.json

Here are a few examples: 

 * [Geoff Charles, Bomb damage in Wales and crashed German bomber - NLW](https://iiif.gdmrdigital.com/iiif-photowall/index.html?manifest=https://damsssl.llgc.org.uk/iiif/2.0/1466237/manifest.json)
 * [Geoff Charles, HMS Conway - NLW](https://iiif.gdmrdigital.com/iiif-photowall/index.html?manifest=https://damsssl.llgc.org.uk/iiif/2.0/1465719/manifest.json)
 * [The Little Foxes - Stanford](https://iiif.gdmrdigital.com/iiif-photowall/index.html?manifest=https://purl.stanford.edu/sp236mx9008/iiif/manifest)
 * [Christ Church Carroll-Photography.VII-Album - Oxford](https://iiif.gdmrdigital.com/iiif-photowall/index.html?manifest=https://iiif.bodleian.ox.ac.uk/iiif/manifest/0b7eead9-312b-4fa2-970e-92405c552970.json)
 * [Cuba Fotos Finiseculares Siglo XIX y Principios XX - Cuba](http://iiif.gdmrdigital.com/iiif-photowall/index.html?manifest=http://imagenes.sld.cu/iiif/prezi/bdc/bnjm/fotos/bnjmscufotcub19-20/manifest.json)

Please let me know if you find any other good ones that could be added to the list above by creating an issue.

## Running locally

Run `npm install` to install the dependencies

## Building

`npm run build`

## Testing locally

`npm start`

Navigate to: http://localhost:8080/index.html?manifest=https://damsssl.llgc.org.uk/iiif/2.0/1466237/manifest.json

Build setup thanks to: https://medium.com/the-node-js-collection/modern-javascript-explained-for-dinosaurs-f695e9747b70

## Deployment

Have a look at the index.html file to see how to configure the IIIF-Photowall project. This file links to the javascript file in the `dist` directory. 
