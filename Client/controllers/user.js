var mq_client = require('../rpc/client'),
    passport = require('passport'),
    lastLoginTime;


/*
 |-----------------------------------------------------------
 | LOGIN LOGOUT
 |-----------------------------------------------------------
*/

exports.postLogin = function(req, res, next){
  //rabbitmq message call
  var user = {
    email: req.body.email
  };
  mq_client.make_request('getUser_queue', user, function(err, results){
    console.log("in getUser_queue "+results);
    if(err)
      throw err;

    //passport authenticate and session only if user is found else return false
    if(results)
      passport.authenticate('local', function(err, user, info){
        if (err)
          return next(err);
        if(!user) {
          res.send("password");
        }else {

          console.log("--------------in poassssport authenticate------------");
          console.log(user);
          req.logIn(user, function(err){
            if(err)
              return next(err);

            res.send(user);
          });

        }

      })(req, res, next);
    else {
      res.send("email");
    }

  });
};

//signup
exports.postSignUp = function(req,res){
    var user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        contactNo: req.body.contactNo,
    };

    console.log("in post signup");
    console.log(user);

    //rabbitmq message call
    // mq_client.make_request('getUser_queue', user, function(err, results){
    //   console.log("in getUser_queue "+results);
    //   if(err)
    //     throw err;
    //   if(results)
    //     res.send(false);
    //   else {
        //rabbitmq message call
        mq_client.make_request('signup_queue', user, function(err, results){
          console.log("in signup_queue "+results);
          if(err)
            throw err;
        });
        res.send(user);
    //   }
    // });
};

// exports.verifyEmail = function(req, res){
//   //rabbitmq message call
//   mq_client.make_request('verifyEmail_queue', user, function(err, results){
//     console.log("in verifyEmail_queue "+results);
//     if(err)
//       throw err;
//     res.send(results);
//   });
// };

exports.getLogout = function(req, res){
  req.session.destroy(function(err){
    res.send("success");
  });
};

exports.deleteUser = function(req, res) {
  res.send("deleting");
};

exports.getCurrentUser = function(req, res){
  var userDetails = req.user;
  userDetails = {
    _id: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    username: req.user.username,
    email: req.user.email,
    password: req.user.password,
    birthday: req.user.birthday,
    contactNo: req.user.contactNo,
    userAccessLevel: req.user.userAccessLevel
  }
  res.send(userDetails);
};


/*
 |-----------------------------------------------------------
 | check if user is logged in
 |-----------------------------------------------------------
*/
exports.isLoggedInAngular = function(req, res, next) {
  if(req.user)
    return next();
  else {
    res.send(false);
  }
};

exports.isLoggedIn = function(req, res, next) {
  if(req.user)
    return next();
  else {
    res.redirect("/");
    // res.send(false);
  }
};
