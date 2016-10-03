'use strict';

// Import app credentials for Twitter
const credentials = require('../../credentials.json').twitter;

// Import Twitter Node library
const Twitter = require('twitter');

// Import Twitter credentials
const twitterClient = new Twitter(credentials);

// Import our server and WebSockets
const server = require('./server');
const sockets = require('./sockets');

// Now stream the home timeline to the console, and to a web page using Express and Socket.io
module.exports.streamTimeline = twitterClient.stream('user', {with: 'followings'}, (stream) => {
    stream.on('data', (event) => {

        sockets.emitEvent('tweet', event);

    });
    stream.on('error', (e) => {
        throw e;
    });
});

// Let's also get a stream of the user's own tweets
module.exports.streamUserTweets = twitterClient.stream('user', {with: 'user'}, (stream) => {
    stream.on('data', (event) => {
        sockets.emitEvent('userTweet', event);
    });
    stream.on('error', (e) => {
        throw e;
    });
});

// Get the user's previous tweets and mentions: we will display these when the page loads so we don't have blank columns
server.express.use('/api/twitter/user/home', (req, res) => {
    twitterClient.get('statuses/home_timeline', (error, tweets, response) => {
        if (error) {
            throw error;
        }
        else {
            res.json(tweets);
        }
    });
});
server.express.use('/api/twitter/user/tweets', (req, res) => {
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
server.express.use('/api/twitter/user/mentions', (req, res) => {
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
