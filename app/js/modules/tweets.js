'use strict';

// A module to format tweets for display, and to get Twitter data from the REST API via Express

const formatTweet = (tweet, element, callback) => {

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

// We'll use jQuery to fetch our tweet JSON data
define(["jquery"], () => {

    const setUpTweetColumn = (tweetData, sectionPrefix, callback) => {

        // Function to set up a column to display tweets

        // Set up our tweets array - we will return this in the callback
        let tweets = [];

        // Go through each tweet and format it accordingly
        $.each(tweetData, (key, tweet) => {
            let tweetSection = document.createElement('section');
            tweetSection.setAttribute('id', sectionPrefix + tweet.id_str);
            formatTweet(tweet, tweetSection, (tweetElement) => {
                $(tweetSection).prepend(tweetElement);
            });
            tweets.push(tweetSection);
        });

        // Return the elements as a callback
        return callback(tweets);

    };

    // Get the user's home timeline
    const getUserHomeTimeline = () => {
        $.get('/api/twitter/user/home', (data) => {

            // Set up our Twitter column
            setUpTweetColumn(data, 'tweet', (tweetColumn) => {
                $('#tweets').prepend(tweetColumn);
            });

        });
    };

    // Get a timeline of the user's most recent tweets
    const getUserTweets = () => {
        $.get('/api/twitter/user/tweets', (data) => {

            // Set up our Twitter column
            setUpTweetColumn(data, 'userTweet', (tweetColumn) => {
                $('#myTweets').prepend(tweetColumn);
            });

        });
    };

    // Get a timeline of the user's most recent mentions
    const getUserMentions = () => {
        $.get('/api/twitter/user/mentions', (data) => {

            // Set up our Twitter column
            setUpTweetColumn(data, 'userMention', (tweetColumn) => {
                $('#mentions').prepend(tweetColumn);
            });

        });
    };

    return {
        getUserHomeTimeline: getUserHomeTimeline,
        getUserTweets: getUserTweets,
        getUserMentions: getUserMentions
    };

});
