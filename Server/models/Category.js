var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
  name: { type: String, unique: true }    //should be unique check
});

module.exports = mongoose.model('Category', categorySchema);
