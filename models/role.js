const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    GuildID: String,
    RoleID: String,
});

const MessageModel = module.exports = mongoose.model('join-roles', RoleSchema);