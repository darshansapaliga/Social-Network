var passport = require('passport'),
    User = require('../models/User');

/*
 |-----------------------------------------------------------
 | LOGIN, SIGNUP, LOGOUT
 |-----------------------------------------------------------
*/

//signup
exports.postSignUp = function(msg, callback){

  var response  = {};
  var user = new User({
    firstName: msg.firstName,
    lastName: msg.lastName,
    email: msg.email,
    password: msg.password,
    contactNo: msg.contactNo
  });
  user.save(function(err) {
    if (!err) {
      response.code = "200";
    }else {
      response.code = "404";
    }
  });
  callback(null, response);
};


exports.deleteUser = function(msg, callback) {
  res.send("deleting");
};




/*
 |-----------------------------------------------------------
 | Get User details
 |-----------------------------------------------------------
*/
exports.getUser = function(msg, callback){

  User.findOne({email: msg.email}, function(err, user){
    if(err)
      return console.log(err);
    var userFound;

    if(user)
      userFound = true;
    else {
      userFound = false;
    }
    callback(null, userFound);
  });
};
