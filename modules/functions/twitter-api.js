// Twitter API functions

// Import app credentials for Twitter
const credentials = require('../../credentials.json').twitter;

// Import libraries
const Twitter = require('twitter');

// Import Twitter credentials
const twitterClient = new Twitter(credentials);

// Import string builder
const stringBuilder = require('./string-builder');

// Now stream the home timeline
module.exports.streamTimeline = twitterClient.stream('user', {with: 'followings'}, (stream) => {
    stream.on('data', (event) => {
        // Filter out events that aren't tweets by looking for objects where the 'text' property is undefined
        if (typeof event.text !== 'undefined' && typeof event.user !== 'undefined') {

            // Build and display the string in the console
            stringBuilder.buildString(event, (displayString) => {
                console.log(displayString);
            });

        }
    });
    stream.on('error', (e) => {
        throw e;
    });
});

// Export the Twitter client so other functions can use it
module.exports.twitterClient = twitterClient;
