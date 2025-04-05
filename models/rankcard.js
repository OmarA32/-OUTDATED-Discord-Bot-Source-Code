const mongoose = require('mongoose');

const RankCardSchema = new mongoose.Schema({
    MemberID: String,
    Link: String,
});

const MessageModel = module.exports = mongoose.model('rank cards', RankCardSchema);