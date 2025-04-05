const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Epic Economy',
   new mongoose.Schema({
    ID: String,
    Coins: Number,
    Bank: Number,
    Limit: Number,
  })
)
