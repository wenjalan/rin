const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const admin = require('firebase-admin');

/**
 * Uploads an array of Message objects to Firebase.
 * @param {String} guildId 
 * @param {String} channelId 
 * @param {[Array]} messages 
 */
async function uploadMessages(guildId, channelId, messages) {
    // get the channel's document reference
    const docRef = db.collection(guildId).doc(channelId);

    // set the messages
    await docRef.set({
        messages: messages
    });

    // log
    console.log(`Uploaded ${messages.length} messages from channel ${channelId} in guild ${guildId}`);
}

/**
 * Returns an Array of Message objects from Firebase.
 * @param {String} guildId
 * @param {String} channelId
 */
async function getMessages(guildId, channelId) {
    // get the channel's document reference
    const docRef = await db.collection(guildId).doc(channelId).get();

    // get the messages
    const messages = docRef.data().messages;
    return messages;
}

// initialize firebase
initializeApp({
    credential: admin.credential.cert('shimarin-5ec68-firebase-adminsdk-t0uzt-096c696348.json'),
});
const db = getFirestore();

// export functions
module.exports = {
    uploadMessages,
    getMessages
}