var version = 'v0.1';
var header  =  "/* ==================================================================================\n";
    header  += " * jquery.flickrPhotostream.js " + version + "\n";
    header  += " * Description: Retrieve's a list of images from the public photostream of a user\n";
    header  += " * Project: http://manuel.manuelles.nl/jquery-flickrPhotostream\n";
    header  += " * Author: Manuel van Rijn\n";
    header  += " * Released under the MIT License.\n";
    header  += " * =============================================================================== */";

var minify = require('jake-uglify').minify;

task('default', ['jquery.flickrPhotostream.min.js']);

desc('General-purpose build containing most features');
minify({'jquery.flickrPhotostream.min.js': [
    'src/jquery.flickrPhotostream.js',
]},{
  header: header
});
