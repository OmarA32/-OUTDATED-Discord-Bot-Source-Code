const mongoose = require('mongoose');

const LevelsOptions = new mongoose.Schema({
    GuildID: String,
    Option:String,
});

const MessageModel = module.exports = mongoose.model('levels options', LevelsOptions);