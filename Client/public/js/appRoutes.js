// angular.module('appRoutes', ['ui.router'])
//   .config(['$routeProvider', '$stateProvider', '$locationProvider', function($routeProvider, $stateProvider, $locationProvider) {

var developmentApp = angular.module('developmentApp',['ui.router']);

developmentApp.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider
        .otherwise('/');

    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl : '../views/test.ejs'
      })
      .state('home', {
        url: '/',
        templateUrl : '../views/home.ejs',
        controller: 'UserController'
      })
      .state('logout', {
        url : 'logout',
        templateUrl : '../views/logout.ejs',
        controller: 'UserController'
      })

    //services page
    .state('home.services', {
        url: 'services',
        templateUrl: '../views/Services.ejs',
        controller: 'ServiceController'
        // resolve: {
        //       userSession: function($state){
        //             //check user for session
        //             $http({
        //               method : "GET",
        //               url : '/api/currentUser'
        //             }).success(function(data) {
        //
        //                 //set user access level
        //                 $rootScope.userAccessLevel = data.userAccessLevel;
        //
        //                 if(data._id) {
        //                     return true;
        //                 }
        //                 if(!data) {
        //                     $state.go('/');
        //                     alert("Please login to access to this page");
        //                 }
        //             })
        //       }
        //     }
    })
    .state('home.addservice', {
        url: 'addService',
        templateUrl: '../views/addService.ejs',
        controller: 'ServiceController'
    })
    .state('home.service', {
        url: '/{serviceId}',
        templateUrl: '../views/services/service.ejs',
        controller: 'ServiceController'
    })
    .state('home.services.service.updateService', {
        url: '/updateService',
        templateUrl: '../views/services/updateService.ejs',
        controller: 'ServiceController'
    })

}).controller("MainController", function(){

});
