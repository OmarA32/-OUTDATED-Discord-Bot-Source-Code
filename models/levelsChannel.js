const mongoose = require('mongoose');

const LevelsChannelSchema = new mongoose.Schema({
    GuildID: String,
    ChannelID:String,
});

const MessageModel = module.exports = mongoose.model('levels-channel', LevelsChannelSchema);