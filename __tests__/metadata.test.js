'use strict';

import {getMetadataField} from '../src/buildPhotoWall';
import manifest_multi from './fixtures/manifest_multi.json';
import manifest_multi_en from './fixtures/manifest_multi_en.json';

// Don't call an jquery or justified gallarey functions as they won't work...
test('Retrieve english label', () => {
    var label = getMetadataField(manifest_multi_en, 'label', 'en');
    expect(label).toBe("'Parsons Collection: Album of views of India and South-East Asia by Major General Sir Arthur Edward Broadbent Parsons'");
});

// Don't call an jquery or justified gallarey functions as they won't work...
test('Retrieve english label when there are two choices', () => {
    console.log("calling metadata with multi " + manifest_multi);
    var label = getMetadataField(manifest_multi, 'label', 'en');
    expect(label).toBe("'Parsons Collection: Album of views of India and South-East Asia by Major General Sir Arthur Edward Broadbent Parsons'");
});
