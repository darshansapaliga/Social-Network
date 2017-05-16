var express      = require('express'),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session      = require('express-session'),
    MongoStore   = require('connect-mongo')(session),
    passport     = require('passport'),
    passportConf = require('./config/passport'),
    secrets      = require('./config/secrets');

var app = express();

//views, bodyparser, cookieParser, session
app.set("views",__dirname+"/public/views");
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname+'/public'));

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "2hjkeydwjfhusdifsb",
  store: new MongoStore({
    url: secrets.mongodburl,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());

//require controllers
var userController = require('./controllers/user'),
    categoryController = require('./controllers/category'),
    serviceController = require('./controllers/service');


//api calls
// app.post('/', userController.isLoggedIn);
app.post('/api/login', userController.postLogin);
// app.delete('/api/user/:id', userController.deleteUser);
app.post('/api/signup', userController.postSignUp);
app.post('/api/logout', userController.getLogout);

//for verifying user and user session
app.get('/api/currentUser', userController.getCurrentUser);

//categories
app.get('/api/getCategories', categoryController.getCategories);

app.post('/api/postServiceAndCategory', categoryController.postServiceAndCategory);

app.get('/api/services/:id', serviceController.getServices);

app.get('/api/getServicesForApprovals', serviceController.getServicesForApprovals);

//get single service
app.get('/api/getSingleService/:serviceId', serviceController.getSingleService);

app.post('/api/userproblem', serviceController.postUserProblem);

app.get('/api/moderatorServices/:moderatorId', serviceController.getModeratorServices);

app.post('/api/updateService', serviceController.updateService);

app.post('/api/updateServiceStatus/:serviceId', serviceController.updateServiceStatus);

app.post('/api/deleteService', serviceController.deleteService);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// error handlers


//listen
var port = Number(process.env.PORT || 3000);
app.listen(port, function(){
  console.log("Server connected on port:"+port);
});

module.exports = app;
