'use strict';

// Using our event object from Twitter, build our string that we will send to the console

// Import the Chalk.js library to make our strings colourful and make the app look less boring, and the Striptags library to remove any HTML tags where necessary
const chalk = require('chalk');
const stripTags = require('striptags');

// Import our get-place script
const getPlace = require('./get-place');

// Set up our buildString function
module.exports.buildString = (event, callback) => {

    // First of all, let's gather all of the information that we need

    // User information
    let username = event.user.name; // Twitter name (e.g. Andrew Havis)
    let handle = '@' + event.user.screen_name; // Twitter handle (e.g. AndrewHavis) - note we prefix this with an at sign
    let followersCount = event.user.followers_count; // The number of followers
    let followsCount = event.user.friends_count; // The number of follows
    let isVerified = event.user.verified; // Is the user verified by Twitter?
    let verified = ''; // We'll set this to the string 'Verified' if the user is verified

    // Tweet information
    let tweet = event.text; // The tweet text
    let timestamp = event.created_at; // The timestamp of the tweet (i.e. the exact time it was sent)
    let source = stripTags(event.source); // The name of the application that sent the tweet (e.g. Twitter for Android)
    let tweetLocation = null; // Default to no location

    // If the user is verified, let's say so
    if (!!isVerified) {
        verified = chalk.cyan(chalk.bold('✓ Verified'));
    }

    // If the tweet is geotagged, let's try getting the tweet's location
    if (event.place !== null) {
        tweetLocation = event.place.full_name; // Get the place name from the place object if it's there
    }
    else if (event.geo !== null) {
        getPlace.getPlaceName(event.geo.coordinates[0], event.geo.coordinates[1], (placeName) => {
            tweetLocation = placeName; // Try to get the place name from reverse geocoding the latitude and longitude
        });
    }

    // Now concatenate this information, using Chalk to make it colourful
    let result = '';
    result += chalk.white('-------------------------------------------------') + '\n'; // Separator
    result += chalk.green(chalk.bold(username)) + ' ' + chalk.white('(' + handle + ')') + ' '; // Username and Twitter handle
    result += chalk.green(followersCount + ' followers ') + chalk.white(followsCount + ' following ') + verified + '\n'; // Followers, follows and verified status
    result += chalk.cyan(tweet) + '\n'; // The tweet text

    // We'll add the location onto the last line if we have it
    if (tweetLocation !== null) {
        result += chalk.green('Sent at ' + timestamp) + chalk.cyan(' from ' + tweetLocation) + chalk.white(' by ' + source);
    }
    else {
        result += chalk.green('Sent at ' + timestamp) + chalk.white(' by ' + source);
    }

    // Now return our resulting string via the callback
    return callback(result);

};
