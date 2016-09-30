'use strict';

// This script is used to compile pug files in the /app directory to html files in /public

// Import Node's fs library
const fs = require('fs');

// Import the Pug module
const Pug = require('pug');

// Import our file finder
const FindFiles = require(__dirname + '/../utilities/find-files');

// A function to search for all *.pug files in a given directory
const findPugFiles = (directory, callback) => {

    // Import the directory into our file finder, and return the result
    FindFiles.findFiles(directory + '/**/*.pug', (pugFiles) => {
        return callback(pugFiles);
    });

};

// Function to compile the pug files in a given directory
module.exports.compilePugFiles = (directory) => {

    // Now find the pug files
    findPugFiles(directory, (results) => {
        // Now compile the pug files that we found into html files in /public
        results.map((result) => {
            let htmlFile = result.replace('.pug', '.html'); // This could be better, in case we have a .pug in the middle of the filename...
            htmlFile = htmlFile.replace('/app/', '/public/'); // Replace /app/ with /public/ to save in the public directory
            let html = Pug.renderFile(result);
            fs.writeFile(htmlFile, html, (err) => {
                if (!err) {
                    console.log(htmlFile + ' was saved successfully');

                }
                else {
                    console.error('An error occurred', err);
                }
            });
        });
    });

};
