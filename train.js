const { Permissions } = require('discord.js');

/**
 * Creates a language model from a Guild's visible text channels.
 * @param {Client} client - The Discord client.
 * @param {Number} guildId - The ID of the guild.
 * @return {String} path - The path to the stored language model.
 */
const createModel = async (client, guildId) => {
    // get all channels in the guild
    const guild = await client.guilds.fetch(guildId);

    // if error
    if (!guild) {
        console.error(`Failed to fetch guild with id ${guildId}`);
        return;
    }

    // verify we have read messages permission in this guild
    const selfGuildMember = await guild.members.fetch(client.user.id);
    if (!selfGuildMember.permissions.has(Permissions.FLAGS.READ_MESSAGE_HISTORY)) {
        console.error(`Bot does not have READ_MESSAGE_HISTORY permission in guild ${guildId}`);
        return;
    }

    // get all text channels in the guild
    const channels = await guild.channels.fetch().then(
        channels => channels.filter(channel => channel.type === 'GUILD_TEXT')
    );

    // if no channels were found
    if (channels.size === 0) {
        console.error(`No text channels found in guild with id ${guildId}`);
        return;
    }
    console.log(`Found ${channels.size} text channels in guild with id ${guildId}`);

    // get message histories from all channels
    const channelMessages = await channels.map(async channel => {
        let messages = [];
        let lastMessageId = null;
        let lastFetched = -1;
        while (lastFetched != 0) {
            const fetched = await channel.messages.fetch({
                limit: 100,
                ...((lastMessageId ? { before: lastMessageId } : {}))
            })
            .catch(err => {
                console.error(`Failed to fetch messages from channel ${channel.id} in guild ${guildId}`);
                console.error(err);
                lastFetched = 0;
            });
            if (fetched) {
                lastFetched = Object.keys(fetched).length;
                messages = messages.concat(fetched);
                lastMessageId = fetched.lastKey();
            }
        }
        console.log(`Found ${messages.length} messages in channel with id ${channel.id}`);
        return messages;
    });
    console.log(`Fetched all messages from all channels in guild with id ${guildId}`);
}

module.exports.createModel = createModel;