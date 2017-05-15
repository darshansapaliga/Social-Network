var mongoose = require('mongoose');

var serviceSchema = new mongoose.Schema({
  name: String,    //should be unique check
  address: String,
  contact: String,
  description: {type: String},
  specialization: [String],
  moderator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  clients: [ {type: mongoose.Schema.Types.ObjectId, ref: 'User'} ],
  members: [ {type: String} ],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  approved: {type: Boolean, default: false},
  problems: [{type: mongoose.Schema.Types.ObjectId, ref: 'Problem'}]
});

module.exports = mongoose.model('Service', serviceSchema);
