import {loadURL as _loadURL} from './buildPhotoWall'
import {getMetadataField as _getMetadataField} from './buildPhotoWall'
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



// Export import notes
// Possible to import a function but it must be exported in other file.
// if export default function loadURL(url) then can import it using:
// import loadURL from './buildPhotoWall'
// if export function loadURL(url) then can import it using:
// import {loadURL} from './buildPhotoWall'

// Export the configuration URL so this can be configered in the containg page
export const loadURL = _loadURL;
export const getMetadataField = _getMetadataField;
