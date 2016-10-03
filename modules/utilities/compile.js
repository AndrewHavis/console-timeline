'use strict';

// Compile our Pug and SASS files

// Import our Pug and SASS compilers
const pug = require(__dirname + '/../compilers/pug');
const sass = require(__dirname + '/../compilers/sass');

// Now set up a wrapper function that will run both of these compilers
module.exports.compileSourceFiles = (directory, sassFile) => {
    pug.compilePugFiles(directory);
    sass.compileSassFile(directory + '/sass/' + sassFile);
};
