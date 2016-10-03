'use strict';

// Used to receive tweets via Socket.io

define(["jquery", "./tweets"], () => {

    // Get our host name
    const hostname = window.location.protocol + '//' + window.location.host;

    // Declare constants
    const socket = io(hostname); // io is defined by Socket.io, which is loaded directly on the page rather than via RequireJS

    // Function to set tweets up for display
    const prepareSocket = (eventName, containerElement) => {
        socket.on(eventName, (data) => {
            // Add a li to the ul tag with our tweet

            // Output the tweet object to the console for reference
            console.log(data);

            // Add a section tag at the top of tweetsDiv, so we get the tweets with the most recent at the top
            let tweetSection = document.createElement('section');
            $(tweetSection).attr('id', eventName + data.id_str);
            $(containerElement).prepend(tweetSection);

            formatTweet(data, tweetSection, (tweetElement) => {
                console.log(tweetElement);
                $(tweetSection).prepend(tweetElement);
            });

        });
    };

    let getLiveTweets = () => {

        // Get the div element that we're adding the tweet to, and add an ul tag inside it
        let tweetsDiv = document.getElementById('tweets');
        let userTweetsDiv = document.getElementById('myTweets');
        let userMentionsDiv = document.getElementById('mentions');

        // Now set up the WebSockets
        prepareSocket('tweet', tweetsDiv);
        prepareSocket('userTweet', userTweetsDiv);
        prepareSocket('userMention', userMentionsDiv);
       
    };
    
    return {
        getLiveTweets: getLiveTweets
    };
    
});
