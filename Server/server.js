var express      = require('express'),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mongoose     = require('mongoose'),
    session      = require('express-session'),
    MongoStore   = require('connect-mongo')(session),
    secrets      = require('./config/secrets'),
    path         = require('path'),
    amqp         = require('amqp'),
    util         = require('util');

var app = express();


mongoose.connect(secrets.mongodburl);
mongoose.connection.on('error', console.error.bind(console, 'connection error'));
mongoose.connection.once('open', function callback(){
  console.log("Mongoose connected to mongolab");
});

//require controllers
var userController = require('./controllers/user'),
    passportController = require('./controllers/passport'),
    serviceController = require('./controllers/services'),
    categoryController = require('./controllers/categories');

//cookieParser
app.use(cookieParser());

var cnn = amqp.createConnection({host:'127.0.0.1'});

cnn.on('ready', function(){
	console.log("listening on queue");

  /*
     verfiy if user exists before signup and after login
  */
  cnn.queue('getUser_queue', function(q){
    q.subscribe(function(message, headers, deliveryInfo, m){
      util.log(util.format( deliveryInfo.routingKey, message));
      util.log("Message: "+JSON.stringify(message));
      util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
      userController.getUser(message, function(err,res){
        if(err)
          console.log(err);
        console.log("------in getUser_queue backend queue calling-----");
        console.log(res);
        //return index sent
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      });
    });
  });

  /*
     user signup and login part
  */
  cnn.queue('signup_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			userController.postSignUp(message, function(err,res){
        if(err)
          console.log(err);
        console.log("------in postSignUp backend queue calling-----");
        console.log(res);
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

  cnn.queue('login_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			userController.postLogin(message, function(err,res){
        if(err)
          console.log(err);
        console.log("------in postSignUp backend queue calling-----");
        console.log(res);
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

  /*
     for passport
  */
  cnn.queue('passport_queue', function(q){
    q.subscribe(function(message, headers, deliveryInfo, m){
      util.log(util.format( deliveryInfo.routingKey, message));
      util.log("Message: "+JSON.stringify(message));
      util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
      passportController.findUserAndAuthenticate(message, function(err,res){
        if(err)
          console.log(err);
        console.log("------in findUserAndAuthenticate backend queue calling-----");
        console.log(res);
        //return index sent
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      });
    });
  });


  cnn.queue('deserializeUser_queue', function(q){
    q.subscribe(function(message, headers, deliveryInfo, m){
      passportController.deserializeUser(message, function(err,res){
        if(err)
          console.log(err);
        console.log("------in deserializeUser_queue backend queue calling-----");
        //return index sent
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      });
    });
  });



    /*
     |-----------------------------------------------------------
     | Services CRUD operations
     |-----------------------------------------------------------
    */

    //get service
    cnn.queue('getService_queue', function(q){
      q.subscribe(function(message, headers, deliveryInfo, m){
        serviecController.getService(message, function(err,res){
          if(err)
            console.log(err);
          console.log("------in getService_queue backend queue calling-----");
          //return index sent
          cnn.publish(m.replyTo, res, {
            contentType:'application/json',
            contentEncoding:'utf-8',
            correlationId:m.correlationId
          });
        });
      });
    });


    //add service
    cnn.queue('addService_queue', function(q){
      q.subscribe(function(message, headers, deliveryInfo, m){
        serviecController.addService(message, function(err,res){
          if(err)
            console.log(err);
          console.log("------in addService_queue backend queue calling-----");
          //return index sent
          cnn.publish(m.replyTo, res, {
            contentType:'application/json',
            contentEncoding:'utf-8',
            correlationId:m.correlationId
          });
        });
      });
    });



    //udpate service
    cnn.queue('updateService_queue', function(q){
      q.subscribe(function(message, headers, deliveryInfo, m){
        serviecController.updateService(message, function(err,res){
          if(err)
            console.log(err);
          console.log("------in updateService_queue backend queue calling-----");
          //return index sent
          cnn.publish(m.replyTo, res, {
            contentType:'application/json',
            contentEncoding:'utf-8',
            correlationId:m.correlationId
          });
        });
      });
    });



    //delete service
    cnn.queue('deleteService_queue', function(q){
      q.subscribe(function(message, headers, deliveryInfo, m){
        serviecController.deleteService(message, function(err,res){
          if(err)
            console.log(err);
          console.log("------in deleteService_queue backend queue calling-----");
          //return index sent
          cnn.publish(m.replyTo, res, {
            contentType:'application/json',
            contentEncoding:'utf-8',
            correlationId:m.correlationId
          });
        });
      });
    });


    /*
     |-----------------------------------------------------------
     | Categories CRUD operations
     |-----------------------------------------------------------
    */
    cnn.queue('getCategories_queue', function(q){
      q.subscribe(function(message, headers, deliveryInfo, m){
        categoryController.getCategories(message, function(err,res){
          if(err)
            console.log(err);
          console.log("------in getCategories_queue backend queue calling-----");
          //return index sent
          cnn.publish(m.replyTo, res, {
            contentType:'application/json',
            contentEncoding:'utf-8',
            correlationId:m.correlationId
          });
        });
      });
    });

    cnn.queue('postServiceAndCategory_queue', function(q){
      q.subscribe(function(message, headers, deliveryInfo, m){
        categoryController.postServiceAndCategory(message, function(err,res){
          if(err)
            console.log(err);
          console.log("------in getCategories_queue backend queue calling-----");
          //return index sent
          cnn.publish(m.replyTo, res, {
            contentType:'application/json',
            contentEncoding:'utf-8',
            correlationId:m.correlationId
          });
        });
      });
    });
    cnn.queue('updateUserAccessLevel_queue', function(q){
      q.subscribe(function(message, headers, deliveryInfo, m){
        userController.updateUserAccessLevel(message, function(err,res){
          if(err)
            console.log(err);
          console.log("------in getCategories_queue backend queue calling-----");
          //return index sent
          cnn.publish(m.replyTo, res, {
            contentType:'application/json',
            contentEncoding:'utf-8',
            correlationId:m.correlationId
          });
        });
      });
    });


});
