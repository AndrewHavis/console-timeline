'use strict';

// Using our event object from Twitter, build our string that we will send to the console

// Import the Chalk.js library to make our strings colourful and make the app look less boring
const chalk = require('chalk');

// Set up our buildString function
module.exports.buildString = (event, callback) => {

    // First of all, let's gather all of the information that we need
    let username = event.user.name; // Twitter name (e.g. Andrew Havis)
    let handle = '@' + event.user.screen_name; // Twitter handle (e.g. AndrewHavis) - note we prefix this with an at sign
    let tweet = event.text; // The tweet text
    let timestamp = event.created_at; // The timestamp of the tweet (i.e. the exact time it was sent)

    // Now concatenate this information, using Chalk to make it colourful
    let result = '';
    result += chalk.white('-------------------------------------------------') + '\n'; // Separator
    result += chalk.green(username + ' ' + chalk.white('(' + handle + ')')) + '\n'; // Username and Twitter handle
    result += chalk.cyan(tweet) + '\n'; // The tweet text
    result += chalk.green('Sent at ' + timestamp); // The timestamp

    // Now return our resulting string via the callback
    return callback(result);

};
