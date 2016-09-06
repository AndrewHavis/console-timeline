'use strict';

// A quick function to get a place name from the Twitter API given a latitude and longitude pair

// Import the Twitter API
const twitter = require('./twitter-api');

// Get the place name from Twitter's reverse geocoding facility
module.exports.getPlaceName = (lat, long, callback) => {
    twitter.twitterClient.get('geo/reverse_geocode', {lat: lat, long: long}, (error, places, response) => {
        return callback(places.result.places[0].full_name);
    });
};
