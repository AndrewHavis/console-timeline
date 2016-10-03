# Twitter Console Timeline
This application will stream all the tweets that are received in your home timeline (that is, from you and everyone you follow) in a terminal or console window, and in a web browser connected to http://localhost:8585. Additionally, the web application will also display your 30 most recent tweets, and your recent mentions.

## Installation
To install, clone this repository with `git clone` in the usual way, and then run `npm install` to install the dependencies.

Currently, you will need a `credentials.json` file for the app to work, in the following format:

    {
        "twitter": {
            "consumer_key": "<Twitter consumer key>",
            "consumer_secret": "<Twitter consumer secret>",
            "access_token_key": "<Twitter access token>",
            "access_token_secret": "<Twitter access token secret>"
        }
    }

You can get these keys by registering an application on https://apps.twitter.com. I am hoping to replace this step with an OAuth login eventually.

## Running
To run this app, simply issue the `node app` command. If the app has been installed correctly, you should see a live stream of tweets sent either by you or by anyone you follow in your console, and in any browser connected to http://localhost:8585.