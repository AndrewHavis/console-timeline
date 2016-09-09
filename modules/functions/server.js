'use strict';

// Server functions

// Import app credentials for Twitter
const credentials = require('../../credentials.json').twitter;

// Import libraries
const Twitter = require('twitter');
const express = require('express');
const socketIo = require('socket.io');

// Import Twitter credentials
const twitterClient = new Twitter(credentials);

// Import string builder
const stringBuilder = require('./string-builder');

// Create an Express server and attach socket.io to it
const app = express();
const server = require('http').Server(app);
const io = socketIo(server);
app.use('/', express.static(__dirname + '/../../app/'));

// Start up our server on port 8590
server.listen(8590);
console.log('Server started on http://localhost:8590');

// Now stream the home timeline to the console, and to a web page using Express and Socket.io
module.exports.streamTimeline = twitterClient.stream('user', {with: 'followings'}, (stream) => {
    stream.on('data', (event) => {
        // Filter out events that aren't tweets by looking for objects where the 'text' property is undefined
        if (typeof event.text !== 'undefined' && typeof event.user !== 'undefined') {

            // Build and display the string in the console
            stringBuilder.buildString(event, (displayString) => {
                console.log(displayString);
            });

            // Send the tweet event to the browser
            io.emit('tweet', event);

        }
    });
    stream.on('error', (e) => {
        throw e;
    });
});

// Export the Twitter client so other functions can use it
module.exports.twitterClient = twitterClient;
