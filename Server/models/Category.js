var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
  name: { type: String, unique: true },    //should be unique check
  specialization: [{type: String}]
});

module.exports = mongoose.model('Category', categorySchema);
