var passport = require('passport'),
    User = require('../models/User');

/*
 |-----------------------------------------------------------
 | LOGIN, SIGNUP, LOGOUT
 |-----------------------------------------------------------
*/

//signup
exports.postSignUp = function(msg, callback){

  console.log("------in postSignUp backend----");
  console.log(msg);

  var response  = {};
  var user = new User({
    firstName: msg.firstName,
    lastName: msg.lastName,
    username: msg.username,
    email: msg.email,
    password: msg.password,
    contactNo: msg.contactNo
  });
  user.save(function(err) {
    if (!err) {
      console.log("user signup successfull");
      response.code = "200";
    }else {
      response.code = "404";
    }
  });
  console.log(user);
  callback(null, response);
};


//signup
exports.postLogin = function(msg, callback){

  console.log("------in postLogin server----");
  console.log(msg);
  console.log(callback);

  var response  = {};
  var user = new User({
    firstName: msg.firstName,
    lastName: msg.lastName,
    username: msg.username,
    email: msg.email,
    password: msg.password,
    birthday: msg.birthday,
    contactNo: msg.contactNo,
    location: msg.address
  });
  user.save(function(err) {
    if (!err) {
      console.log("user login successfull");
      response.code = "200";
      reseponse.user = user;
    }else {
      response.code = "404";
    }
  });
  console.log(user);
  callback(null, response);
};



exports.getLogout = function(msg, callback){
  req.logout();
  res.redirect('/');
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
    console.log("-----------------getUser------------------------------------------");
    console.log(user);
    var userFound;

    if(user)
      userFound = true;
    else {
      userFound = false;
    }
    callback(null, userFound);
  });
};


exports.updateUserAccessLevel_queue = function(req, res) {

    var response = {};
    User.findById(req.id, function(err, user){
        user.userAccessLevel = "moderator";

        user.save(function(err){
            if(err)
                return res(null, response(error = err));
            response.code = 200;
        });

        response.data = user;
        res(null, user);
    });

}
