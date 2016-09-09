'use strict';

// Used to receive tweets via Socket.io

// Declare constants
const socket = io('http://localhost:8585');

// Get the div element that we're adding the tweet to, and add an ul tag inside it
let tweetsDiv = document.getElementById('tweets');
let tweetsList = document.createElement('ul');
tweetsDiv.appendChild(tweetsList);

socket.on('tweet', (data) => {
    // Add a li to the ul tag with our tweet
    console.log(data);
    let tweet = document.createTextNode(data.text);
    let tweetElement = document.createElement('li');
    tweetElement.appendChild(tweet);
    tweetsList.appendChild(tweetElement);
});
