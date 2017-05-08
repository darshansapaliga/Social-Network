var mongoose = require('mongoose');

var clusterSchema = new mongoose.Schema({
  name: String,    //should be unique check
  description: {type: String},
  moderator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: [ {type: mongoose.Schema.Types.ObjectId, ref: 'User'} ],
  servicesGroup: String,
  category: String
});

module.exports = mongoose.model('Cluster', clusterSchema);
