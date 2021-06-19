# Twitch Getting Started with Chatbots & IRC
=================

## Chatbot Overview

Twitch offers an Internet Relay Chat (IRC) interface for chat functionality. Chatbots allow you to programmatically interact with a Twitch chat feed using IRC standards; the bot connects to the Twitch IRC network as a client to perform these actions.This guide presents an easy bot example to get you started.

### Get Environment Variables

To start, you’ll need three environment variables:
 
| *Variable*  | *Description*   |
|---|---|---|---|---|
| `BOT_USERNAME`  |  The account (username) that the chatbot uses to send chat messages. This can be your Twitch account. Alternately, many developers choose to create a second Twitch account for their bot, so it's clear from whom the messages originate. |  
|`CHANNEL_NAME`   |  The Twitch channel name where you want to run the bot. Usually this is your main Twitch account.
|`OAUTH_TOKEN`   |The token to authenticate your chatbot with Twitch's servers. Generate this with [https://twitchapps.com/tmi/](https://twitchapps.com/tmi/) (a Twitch community-driven wrapper around the Twitch API), while logged in to your chatbot account. The token will be an alphanumeric string.|  

### Running the bot


1. To start, `cd` into `ChatBot/` and run `npm install` 

2. Create `.env` file in the root of `/ChatBot/` with contents: 

```
BOT_USERNAME="BotName"
CHANNEL_NAME="NameExample1 NameExample2 etc"
OAUTH_TOKEN="{Your Token for BotName}"
```


3. Your chatbot is ready to run! To run, type `node bot.js` 

4. The Chatbot will now be 'listening' to any of the channels that you specified in your `.env` `CHANNEL_NAME` variable. 
    * There are currently two commands that you can try out: 
      * `!d20` - you can replace `20` with any arbitrary number to get a random number between 1 and your input. This is pretty underwhelming, but I left it in because it does showcase some interesting features and can provide some guidance to anyone looking to make a new command
      * `!msg {channelName} {message}` - this was so much easier than I had expected! This command will send a message to the specified channel from your channel! The specified channel doesn't even need to be in your `CHANNEL_NAME` variable... It's a little dangerous right now so use responsibly. We'll need to add some validation for who can use this and maybe a cooldown or something? Idk It's just a POC right now

## Next Steps

* I'm going to try to write a websocket so that our front end panel extension can listen in on events and trigger redeems. 
