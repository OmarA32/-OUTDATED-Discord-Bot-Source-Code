const mongoose = require('mongoose');

const LogsChannels = new mongoose.Schema({
    GuildID: String,
    ChannelID:String,
});

const MessageModel = module.exports = mongoose.model('logs-channels', LogsChannels);