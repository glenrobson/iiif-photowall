'use strict';

import {processManifest} from '../src/buildPhotoWall';
import manifest from './fixtures/manifest.json';

let called = false;
function metadataTest(manifest, config) {
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
    expect(called).toBe(true);
});

