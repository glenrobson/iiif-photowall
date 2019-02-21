global.fetch = require('jest-fetch-mock');

import * as $ from 'jquery';
global['$'] = global['jQuery'] = $;

//import swipebox from 'jquery.swipebox';
//import 'jquery.swipebox/src/css/swipebox.min.css';
//import justifiedGallery from 'justifiedGallery';
//import 'justifiedGallery/src/less/justifiedGallery.less';

