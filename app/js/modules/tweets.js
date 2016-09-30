'use strict';

// A module to format tweets for display

let formatTweet = (tweet, element, callback) => {

    // Get the tweet ID
    const tweetId = tweet.id_str;

    // Now format the tweet within the given element
    twttr.widgets.createTweet(tweetId, element, {
        dnt: true,
        theme: 'light'
    }).then((tweetElement) => {
        return callback(tweetElement);
    });
};
