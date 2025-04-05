const mongoose = require('mongoose');

module.exports = mongoose.model(
  'inventory',
   new mongoose.Schema({
    ID: String,
    Inventory: Object,
  })
)
