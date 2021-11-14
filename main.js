const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const { createModel } = require('./train.js');
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

// on interaction create
client.on('interactionCreate', (interaction) => {
    // if slash command
    if (interaction.isCommand()) {
        // if it was train
        if (interaction.commandName === 'train') {
            createModel(interaction.client, interaction.guildId);
        }

        // if it was info
        if (interaction.commandName === 'info') {
            console.log(`Received info command from ${interaction.user.username} in ${interaction.guild.name}`);
        }

        // if it was delete
        if (interaction.commandName === 'delete') {
            console.log(`Received delete command from ${interaction.user.username} in ${interaction.guild.name}`);
        }

        // acknowledge
        interaction.reply('acknowledged');

        // if it was none of the above, ignore
        return;
    }
});

// log in
client.login(token);