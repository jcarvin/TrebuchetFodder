const tmi = require('tmi.js');
const dotenv = require('dotenv');

dotenv.config();

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: [...process.env.CHANNEL_NAME.split(' ')],
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(channel, context, msg, self) {
  // Ignore messages from the bot
  if (self) {
    return;
  }

  // parse the message
  const messageArray = msg.split(' ');
  const commandName = messageArray[0];

  // If the command is known, let's execute it
  if (/!d\d/.test(commandName)) { // !d20 | !d999999999 | pretty much anything !d{number}
    const num = rollDice(commandName);
    client.say(channel, `You rolled a ${num}.`);
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === '!msg') {
    // !msg {channelName} {message}
    const channelName = messageArray[1];
    const message = messageArray.slice(2, messageArray.length).join(' ');
    // send the message to the specified channel
    client.say(channelName, `From ${channel}'s chat: "${message}"`);
    // let the host channel know that the message has been sent
    client.say(
      channel,
      `Your message has been sent to ${channelName}'s chat! `
    );
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}

// Function called when the "dice" command is issued
function rollDice(commandName) {
  const num = commandName.split('d')[1];
  const sides = num < 9999999 ? num : 9999999;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
