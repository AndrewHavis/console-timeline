'use strict';

// This script is used to compile SASS files in the /app/sass directory to CSS files in /public/css

// Import Node's fs library
const fs = require('fs');

// Import the SASS module
const sass = require('node-sass');

// Function to compile a SASS file
module.exports.compileSassFile = (sassFile) => {

    let cssFile = sassFile.replace('.scss', '.css'); // This could be better, in case we have a .scss in the middle of the filename...
    cssFile = cssFile.replace('/sass/', '/css/'); // Replace the /sass/ directory with /css/
    cssFile = cssFile.replace('/app/', '/public/'); // Replace /app/ with /public/ to save in the public directory
    sass.render({
        file: sassFile
    }, (err, result) => {
        if (!err) {
            fs.writeFile(cssFile, result.css, (error) => {
                if (!error) {
                    console.log(cssFile + ' was saved successfully');

                }
                else {
                    console.error('An error occurred when writing the CSS file', error);
                }
            });
        }
        else {
            console.error('An error occured when compiling the SASS', err);
        }
    });
};
