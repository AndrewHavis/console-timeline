'use strict';

// Server functions

// Import libraries
const express = require('express');
const fse = require('fs-extra');

// Import string builder
const stringBuilder = require(__dirname + '/../utilities/string-builder');

// Compile Pug and SASS files
const compile = require(__dirname + '/../utilities/compile');
fse.mkdirp(__dirname + '/../../public/css', (err) => {
    if (!!err) console.error(err);
}); // Create the /public and /public/css directories
compile.compileSourceFiles(__dirname + '/../../app', 'main.scss');

// Copy JS files
fse.copy(__dirname + '/../../app/js', __dirname + '/../../public/js', (err) => {
    if (!!err) console.error(err);
});

// Create an Express server and attach socket.io and Bower to it
const app = express();
const server = require('http').Server(app);
app.use('/', express.static(__dirname + '/../../public/'));
app.use('/lib', express.static(__dirname + '/../../bower_components'));

// Export our Express instance and our server object so we can access them externally
module.exports.express = app;
module.exports.server = server;

// Start up our server on port 8585
server.listen(8585);
console.log('Server started on http://localhost:8585');


