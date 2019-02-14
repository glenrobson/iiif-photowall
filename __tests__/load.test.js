'use strict';

import {processManifest} from '../src/buildPhotoWall';
import manifest from './fixtures/manifest.json';

let called = false;
function metadataTest(manifest, config) {
    console.log('Called local test');
    expect(config.showMetadata).toBe(metadataTest);
    expect(manifest.label).toBe('Test Manifest');
    called = true;
}


test('Call metadata function on load of manifest', () => {
    document.body.innerHTML = '<div id="photowall"></div>';
    var config = {};
    config.showMetadata = metadataTest;
    processManifest(manifest, config);
    console.log('checking called');
    expect(called).toBe(true);
});

