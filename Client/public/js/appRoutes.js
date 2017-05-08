angular.module('appRoutes', ['ui.router'])
  .config(['$routeProvider', '$stateProvider', '$locationProvider', function($routeProvider, $stateProvider, $locationProvider) {
    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl : '../views/test.ejs'
      })
      .state('home', {
        url: '/',
        templateUrl : '../views/index.ejs',
        controller: 'MainController'
      })
      .state('login', {
        url : '/login',
        templateUrl : '../views/login.ejs',
        controller: 'UserController'
      })
      .state('signup', {
        url : '/signup',
        templateUrl : '../views/signup.ejs',
        controller: 'UserController'
      })
      .state('logout', {
        url : '/logout',
        templateUrl : '../views/logout.ejs',
        controller: 'UserController'
      })


      //profile page states
      .state('profile', {
        url : '/profile',
        templateUrl : '../views/profile/profile.ejs',
        controller: 'UserController'
      })
      .state('profile.personalDetails', {
        url: '/personalDetails',
        views: {
          'profileView': {
            templateUrl: '../views/profile/personalDetails.ejs',
            controller: 'UserController'
          }
        }
    })

    //services page
    .state('services', {
      url: '/services',
      templateUrl: '../views/services/services.ejs',
      controller: 'ServiceController'
      }
  });
    $locationProvider.html5Mode(true);
    console.log("in appRoutes");
  }]);
