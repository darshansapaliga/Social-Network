var mongoose = require('mongoose');

var serviceGroupSchema = new mongoose.Schema({

  name: String,    //should be unique check

});

module.exports = mongoose.model('ServiceGroup', serviceGroupSchema);
