const mongoose = require('mongoose');

const WelcomeChannelSchema = new mongoose.Schema({
    GuildID: String,
    ChannelID:String,
});

const MessageModel = module.exports = mongoose.model('welcome-channel', WelcomeChannelSchema);