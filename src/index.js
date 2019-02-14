import {loadURL as _loadURL} from './buildPhotoWall'

// Export import notes
// Possible to import a function but it must be exported in other file.
// if export default function loadURL(url) then can import it using:
// import loadURL from './buildPhotoWall'
// if export function loadURL(url) then can import it using:
// import {loadURL} from './buildPhotoWall'

// Export the configuration URL so this can be configered in the containg page
export const loadURL = _loadURL;
