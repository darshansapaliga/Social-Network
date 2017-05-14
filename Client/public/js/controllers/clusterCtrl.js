developmentApp.controller('ServiceController', function($scope, $state, $rootScope, $http) {

    $scope.noservicefound = false;

    console.log("in cluster controller");

    // get current user details
    $http({
      method : "GET",
      url : '/api/currentUser'
    }).success(function(data) {
      console.log("success currentUser");
      console.log(data);

      if(data){
        $scope.currentUser = data;

        //set user access level
        // $scope.userAccessLevel = data.userAccessLevel;

      }else {
        $state.go("home");
      }

    }).error(function(error) {
        $state.go("home");
      console.log("Error posting data in currentUser");
      console.log(error);
    });



    // get all services
    $http({
      method : "POST",
      url : '/api/services'
    }).success(function(data) {
      console.log("success services");
      console.log(data);

      if(data) {




      }else {
            $scope.noservicefound = true;
      }

    }).error(function(error) {
      console.log("Error posting data in currentUser");
    });




    //adding service
    $scope.addservice = function() {
      $http({
        method : "POST",
        url : '/api/Services/addService',
        data : {
          "name": $scope.name,    //should be unique check and without spaces
          "description": $scope.description,
          "moderator": $scope.moderator,
          "members": $scope.memebers,
          "servicesGroup": $scope.servicesGroup,
          "category": $scope.category
        }
      }).success(function(data) {
        console.log("success adding service");
        console.log(data);

        if(data) {
          //something
        }

      }).error(function(error) {
        console.log("Error posting data in addToCart");
      });
    };



    //route methods
    $scope.createservice = function() {
        $state.go("home.addservices");
    }

    $scope.toservicepage = function() {
        $state.go("home.service");
    }

});
