const mongoose = require('mongoose');

const ByeChannelSchema = new mongoose.Schema({
    GuildID: String,
    ChannelID:String,
});

const MessageModel = module.exports = mongoose.model('bye-channel', ByeChannelSchema);