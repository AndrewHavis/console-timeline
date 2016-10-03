'use strict';

// Server functions

// Import app credentials for Twitter
const credentials = require('../../credentials.json').twitter;

// Import libraries
const Twitter = require('twitter');
const express = require('express');
const socketIo = require('socket.io');
const fse = require('fs-extra');

// Import Twitter credentials
const twitterClient = new Twitter(credentials);

// Import string builder
const stringBuilder = require(__dirname + '/../utilities/string-builder');

// Compile Pug and SASS files
const compile = require(__dirname + '/compile');
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
const io = socketIo(server);
app.use('/', express.static(__dirname + '/../../public/'));
app.use('/lib', express.static(__dirname + '/../../bower_components'));

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

// Start up our server on port 8585
server.listen(8585);
console.log('Server started on http://localhost:8585');

const emitEvent = (eventName, event) => {
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
            io.emit('userMention', event);
        }

    }
};

// Now stream the home timeline to the console, and to a web page using Express and Socket.io
module.exports.streamTimeline = twitterClient.stream('user', {with: 'followings'}, (stream) => {
    stream.on('data', (event) => {

        emitEvent('tweet', event);

    });
    stream.on('error', (e) => {
        throw e;
    });
});

// Let's also get a stream of the user's own tweets
module.exports.streamUserTweets = twitterClient.stream('user', {with: 'user'}, (stream) => {
    stream.on('data', (event) => {
        emitEvent('userTweet', event);
    });
    stream.on('error', (e) => {
        throw e;
    });
});

// Get the user's previous tweets and mentions: we will display these when the page loads so we don't have blank columns
app.use('/api/twitter/user/home', (req, res) => {
    twitterClient.get('statuses/home_timeline', (error, tweets, response) => {
        if (error) {
            throw error;
        }
        else {
            res.json(tweets);
        }
    });
});
app.use('/api/twitter/user/tweets', (req, res) => {
    // Limit this to 30 tweets to speed it up a bit
    twitterClient.get('statuses/user_timeline', {user: credentials.screen_name, count: 30, include_rts: 1}, (error, tweets, response) => {
       if (error) {
           throw error;
       }
       else {
           res.json(tweets);
       }
    });
});
app.use('/api/twitter/user/mentions', (req, res) => {
    twitterClient.get('statuses/mentions_timeline', (error, tweets, response) => {
        if (error) {
            throw error;
        }
        else {
            res.json(tweets);
        }
    });
});

// Export the Twitter client so other functions can use it
module.exports.twitterClient = twitterClient;
