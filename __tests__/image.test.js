'use strict';

import {getImageUrl} from '../src/buildPhotoWall';
import image_no_sizes from './fixtures/image_no_sizes.json';

// Don't call an jquery or justified gallarey functions as they won't work...
test('Retrieve english label', () => {
    var image = {};
    image['id'] = 'http://dams.llgc.org.uk/iiif/2.0/image/4574753';
    
    var imageURL = getImageUrl(image, 512,512,image_no_sizes);
    expect(imageURL).toBe("http://dams.llgc.org.uk/iiif/2.0/image/4574753/full/!512,512/0/default.jpg");
});

