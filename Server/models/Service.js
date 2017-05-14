var mongoose = require('mongoose');

var serviceSchema = new mongoose.Schema({
  name: String,    //should be unique check
  address: String,
  contact: String,
  description: {type: String},
  moderator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: [ {type: mongoose.Schema.Types.ObjectId, ref: 'User'} ],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

module.exports = mongoose.model('Service', serviceSchema);
