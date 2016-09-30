'use strict';

// Used to receive tweets via Socket.io

define(["./tweets"], () => {
   
   let getLiveTweets = () => {
       
        // Get our host name
        const hostname = window.location.protocol + '//' + window.location.host;

        // Declare constants
        const socket = io(hostname); // io is defined by Socket.io, which is loaded directly on the page rather than via RequireJS

        // Get the div element that we're adding the tweet to, and add an ul tag inside it
        let tweetsDiv = document.getElementById('tweets');
        socket.on('tweet', (data) => {
            // Add a li to the ul tag with our tweet

            // Output the tweet object to the console for reference
            console.log(data);

            // Add a section tag at the top of tweetsDiv, so we get the tweets with the most recent at the top
            let tweetSection = document.createElement('section');
            tweetSection.setAttribute('id', 'tweet' + data.id_str);
            tweetsDiv.insertBefore(tweetSection, tweetsDiv.childNodes[0]);

            formatTweet(data, tweetSection, (tweetElement) => {
                console.log(tweetElement);
            });

        });
       
    };
    
    return {
        getLiveTweets: getLiveTweets
    };
    
});
