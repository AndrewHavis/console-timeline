'use strict';

// Import server and Twitter API
const server = require('./server');
const twitter = require('./twitter');

// Import string builder
const stringBuilder = require(__dirname + '/../utilities/string-builder');

// Set up Socket.io
const socketIo = require('socket.io');
const httpServer = server.server;
const io = socketIo(httpServer);

// Initiate the user counter and some strings to make our messages grammatical
let userCount = 0;
let thirdPerson = 'are'; // This will be 'is' if there's only one user
let s = 's'; // This will be an empty string if there's only one user

// Set up socket.io's connect and disconnect events
io.on('connection', (socket) => {
    userCount++;
    if (userCount === 1) {
        thirdPerson = 'is';
        s = '';
    }
    else {
        thirdPerson = 'are';
        s = 's';
    }
    stringBuilder.buildString('A user has connected: there ' + thirdPerson + ' now ' + userCount + ' user' + s + '.', true, (displayString) => {
        console.log(displayString);
    });
});
io.on('disconnect', (socket) => {
    userCount--;
    if (userCount === 1) {
        thirdPerson = 'is';
        s = '';
    }
    else {
        thirdPerson = 'are';
        s = 's';
    }
    stringBuilder.buildString('A user has disconnected: there ' + thirdPerson + ' now ' + userCount + ' user' + s + '.', true, (displayString) => {
        console.log(displayString);
    });
});

// Export a function to emit WebSockets events
module.exports.emitEvent = (eventName, event) => {
    // Filter out events that aren't tweets by looking for objects where the 'text' property is undefined
    if (typeof event.text !== 'undefined' && typeof event.user !== 'undefined') {

        // Build and display the string in the console if it is from the user's home timeline
        if (eventName === 'tweet') {
            stringBuilder.buildTweetString(event, (displayString) => {
                console.log(displayString);
            });
        }

        io.emit(eventName, event);

        // If the tweet contains the user's Twitter handle, also emit a separate event to add it to the mentions column
        if (event.text.indexOf(twitter.twitterHandle) > -1) {
            io.emit('userMention', event);
        }

    }
};
