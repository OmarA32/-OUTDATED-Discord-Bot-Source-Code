const mongoose = require('mongoose');

const AiChannelSchema = new mongoose.Schema({
    GuildID: String,
    ChannelID:String,
});

const MessageModel = module.exports = mongoose.model('ai-channel', AiChannelSchema);