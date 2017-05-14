developmentApp.controller('ServiceController', function($scope, $state, $stateParams, $http) {

    $scope.noservicefound = false;

    console.log("in service controller");

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


    console.log("category id from params");
    console.log($state.params.categoryId);

    // get all services
    $http({
      method : "GET",
      url : '/api/services/'+$state.params.categoryId
    }).success(function(data) {
      console.log("success get all services");
      console.log(data);

      if(!data) {
          $scope.noservicefound = true;
      }

    }).error(function(error) {
      console.log("Error in get services");
      console.log(error);
    });




    //route methods
    $scope.createservice = function() {
        $state.go("home.addservices");
    }

    $scope.toservicepage = function() {
        $state.go("home.service");
    }

});
