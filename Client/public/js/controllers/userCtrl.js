angular.module('UserCtrl', [])
  .controller('UserController', function($scope, $http) {

    //user signup validation section




    //get current user details
    $http({
      method : "POST",
      url : '/api/currentUser'
    }).success(function(data) {
      console.log("success currentUser");
      console.log(data);
      if(data){
        $scope.currentUser = data;
        var date = new Date(data.birthday),
            month = date.getMonth(),
            year = date.getYear(),
            day = date.getDate();
        console.log(year);
        var fullBirthday = month+'/'+day+'/'+year;
        $scope.fullBirthday = fullBirthday;
        // $scope.lastLoginTime = data.lastLoginDateTime;
      }
    }).error(function(error) {
      console.log("Error posting data in currentUser");
    });



    /*
     |-----------------------------------------------------------
     | User login signup
     |-----------------------------------------------------------
    */

    //user login
    $scope.login = function() {
      $http({
        method : "POST",
        url : '/api/login',
        data : {
          "email": $scope.email,
          "password": $scope.password
        }
      }).success(function(data) {
        console.log("success login");
        console.log(data);
        if(data == "email")
          alert("Email already associated with another account");
        else if(data == "password")
          alert("password incorrect");
        else {
          $scope.currentUser = data;
          window.location = '/';
        }
      }).error(function(error) {
        console.log("Error posting data in login");
      });
    };

    //user signup
    $scope.signup = function() {
      $http({
        method : "POST",
        url : '/api/signup',
        data : {
          "firstName": $scope.firstName,
          "lastName": $scope.lastName,
          "username": $scope.username,
          "email": $scope.email,
          "password": $scope.password,
          "birthday": $scope.birthday,
          "contactNo": $scope.contactNo,
          "address": $scope.address,
          "location": $scope.location
        }
      }).success(function(data) {
        console.log("success signup");
        console.log(data);
        if(data == "email")
          alert("Email already associated with another account");
        else
          window.location = '/login';
        // $locationProvider.path('/login');
      }).error(function(error) {
        console.log("Error posting data in addToCart");
      });
    };

    //user logout
    $scope.logout = function() {
      console.log("---------------------in logout");
      $http({
        method : "POST",
        url : '/api/logout'
      }).success(function(data) {
        console.log("success logout");
        window.location = '/';
      }).error(function(error) {
        console.log("Error posting data in addToCart");
      });
    };


});
