'use strict';

import {processManifest} from '../src/buildPhotoWall';
import manifest from './fixtures/manifest.json';

import $ from 'jquery'
import jQuery from 'jquery'
window.jQuery = $;
window.$ = $;

import justifiedGallery from 'justifiedGallery';
//import swipebox from 'jquery.swipebox';

let called = false;
function metadataTest(manifest, config) {
    console.log('Called local test');
    expect(config.showMetadata).toBe(metadataTest);
    expect(manifest.label).toBe('Test Manifest');
    called = true;
}


// Don't call an jquery or justified gallarey functions as they won't work...
test('Call metadata function on load of manifest', () => {
    document.body.innerHTML = '<div id="photowall"></div>';
    var config = {};
    config.showMetadata = metadataTest;
    processManifest(manifest, config);
    console.log('checking called');
    expect(called).toBe(true);
});

