const mongoose = require('mongoose');

const WarnsSchema = new mongoose.Schema({
    guildid: String,
    user: String,
    content: Array
});

const MessageModel = module.exports = mongoose.model('warns', WarnsSchema);