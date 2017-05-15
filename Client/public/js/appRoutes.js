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
    .state('home.categories', {
        url: 'services',
        templateUrl: '../views/categories.ejs',
        controller: 'CategoryController'
    })
    .state('home.addCategory', {
        url: 'addService',
        templateUrl: '../views/addCategory.ejs',
        controller: 'CategoryController'
    })
    .state('home.clusters', {
        url: 'clusters',
        templateUrl: '../views/services.ejs',
        params: {categoryId: null},
        controller: 'ServiceController'
    })
    .state('home.userproblem', {
        url: 'problem',
        templateUrl: '../views/servicesform.ejs',
        params: {categoryId: null},
        controller: 'ServiceFormController'
    })
    .state('home.service', {
        url: 'service',
        templateUrl: '../views/service.ejs',
        params: {serviceId: null},
        controller: 'SingleServiceController'
    })
    .state('home.moderatorServices', {
        url: 'moderatorServices',
        templateUrl: '../views/moderatorServices.ejs',
        controller: 'ModeratorServiceController'
    })
    .state('home.editService', {
        url: 'editService',
        templateUrl: '../views/editService.ejs',
        params: {serviceId: null},
        controller: 'EditServiceController'
    })
    .state('home.adminApprovals', {
        url: 'approvals',
        templateUrl: '../views/adminApprovals.ejs',
        params: {serviceId: null},
        controller: 'EditServiceController'
    })

}).controller("MainController", function(){

});
