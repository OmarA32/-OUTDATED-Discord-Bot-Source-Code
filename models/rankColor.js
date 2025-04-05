const mongoose = require('mongoose');

const RankColorSchema = new mongoose.Schema({
    MemberID: String,
    Color: String,
});

const MessageModel = module.exports = mongoose.model('rank colors', RankColorSchema);