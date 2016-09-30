'use strict';

// A script to find files matching a particular criteria

// Import glob module
const glob = require('glob');

// Now let's set up the function that will allow us to find files
module.exports.findFiles = (criteria, callback) => {

    // Pass our criteria to glob
    glob(criteria, (err, files) => {
        // If no errors occurred, return our files array
        if (!err) {
            return callback(files);
        }
        else {
            console.error('An error occurred when searching for files:', err);
            return callback(null);
        }
    });

};
