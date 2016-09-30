'use strict';

// Import Angular and Socket.io
require.config({
    paths: {
        angular: '/lib/angular/angular.min',
        bootstrap: '/lib/bootstrap/dist/js/bootstrap.min'
    }
});

// Import our script to load live tweets
require(['modules/sockets'], (sockets) => {
    sockets.getLiveTweets(); 
});