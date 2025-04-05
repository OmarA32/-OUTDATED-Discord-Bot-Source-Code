const mongoose = require('mongoose');

const ModOptions = new mongoose.Schema({
    GuildID: String,
    Option:String,
});

const MessageModel = module.exports = mongoose.model('auto mod', ModOptions);