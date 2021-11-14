const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

// on client ready
client.once('ready', () => {
    console.log('Shimarin online!');
});

// on client message
client.on('messageCreate', (message) => {
    // log message
    console.log(`${message.author.username}: ${message.content}`);
});

// log in
client.login(token);