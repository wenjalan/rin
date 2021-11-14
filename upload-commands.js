const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, token } = require('./config.json');

const commands = [
    // train command
	new SlashCommandBuilder()
        .setName('train')
        .setDescription('Trains Rin on all messages in the server, creating a language model.'),

    // info command
	new SlashCommandBuilder()
        .setName('info')
        .setDescription('Responds with information about Rin\'s language model of this server.'),
	
    // delete command
    new SlashCommandBuilder()
        .setName('delete')
        .setDescription('Deletes Rin\'s language model of this server.'),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(
    Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);