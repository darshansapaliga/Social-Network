var mongoose = require('mongoose');

var problemSchema = new mongoose.Schema({
  name: String,
  contact: String,
  address: String,
  description: {type: String},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

module.exports = mongoose.model('Problem', problemSchema);
