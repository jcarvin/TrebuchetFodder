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
  if (/!d\d/.test(commandName)) {
    // !d20 | !d999999999 | pretty much anything !d{number}
    const num = rollDice(commandName);
    client.say(channel, `You rolled a ${num}.`);
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === '!msg') {
    // !msg {channelName} {message}
    const channelName = messageArray[1];
    const message = messageArray.slice(2, messageArray.length).join(' ');
    // send the message to the specified channel
    client.say(channelName, `From ${channel}'s chat: "${message}"`);
    console.log(`From ${channel}'s chat: "${message}" To: ${channelName}`);
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

// ----------- websocket
const webSocketsServerPort = 8082;
const webSocketServer = require('websocket').server;
const http = require('http');
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server,
});
// I'm maintaining all active connections in this object
const clients = {};

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return s4() + s4() + '-' + s4();
};

wsServer.on('request', function (request) {
  var userID = getUniqueID();
  console.log(
    new Date() +
      ' Recieved a new connection from origin ' +
      request.origin +
      '.'
  );
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log(
    'connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients)
  );
  connection.send('hey');
  console.log('sent message');
});

wsServer.on('connect', (socket) => {
  socket.on('message', function incoming(data) {
    console.log(data);
    // if you want to send that message back to the client who sent it,
    // you can use send method on the socket
    socket.send(data);
  });
});
