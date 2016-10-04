'use strict';

// Import server
const server = require('./server');

// Import string builder and grammar module
const stringBuilder = require(__dirname + '/../utilities/string-builder');
const grammar = require(__dirname + '/../utilities/grammar');

// Set up Socket.io
const socketIo = require('socket.io');
const httpServer = server.server;
const io = socketIo(httpServer);

// Initiate the user counter and some strings to make our messages grammatical
let userCount = 0;

// Set up socket.io's connect and disconnect events
io.on('connection', (socket) => {
    userCount++;
    socket.on('disconnect', () => {
        userCount--;
        stringBuilder.buildString('A user has disconnected: there ' + grammar.getThirdPerson(userCount) + ' now ' + userCount + ' user' + grammar.getPlural(userCount) + '.', true, (displayString) => {
            console.log(displayString);
        });
    });
    stringBuilder.buildString('A user has connected: there ' + grammar.getThirdPerson(userCount) + ' now ' + userCount + ' user' + grammar.getPlural(userCount) + '.', true, (displayString) => {
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
        if (event.text.indexOf(event.user.screen_name) > -1) {
            console.log(event.text);
            console.log(event.user.screen_name);
            io.emit('userMention', event);
        }

    }
};
