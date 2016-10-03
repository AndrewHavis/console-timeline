'use strict';

// Import Angular and Socket.io
require.config({
    paths: {
        angular: '/lib/angular/angular.min',
        bootstrap: '/lib/bootstrap/dist/js/bootstrap.min',
        jquery: '/lib/jquery/dist/jquery.min'
    }
});

// Import our script to load live tweets, as well as the user's timeline and mentions
require(['modules/sockets', 'modules/tweets'], (sockets, tweets) => {
    sockets.getLiveTweets();
    tweets.getUserHomeTimeline();
    tweets.getUserTweets();
    tweets.getUserMentions();
});
