developmentApp.controller('SingleServiceController', function($scope, $state, $stateParams, $http) {

    //get current user details
    $http({
      method : "GET",
      url : '/api/currentUser'
    }).success(function(data) {
      if(data){
            $scope.currentUser = data;
        }else{
            $state.go("home");
        }
    }).error(function(error) {
      console.log("Error posting data in currentUser");
      console.log(error);
    });



    $http({
      method : "GET",
      url : '/api/getSingleService/'+$state.params.serviceId
    }).success(function(data) {
      if(data.code == 200){
            $scope.service = data.data;
        }else {
            $scope.service = null;
            alert("There was some error in retrieving service. Please try again.");
        }
    }).error(function(error) {
      console.log("Error getting data from categories");
      console.log(error);
    });


    $scope.deleteService = function() {
        $http({
            method : "POST",
            url : '/api/deleteService/'+$state.params.serviceId
        }).success(function(data) {
            if(data.code == 200){
                $state.go("home.categories");
            }
        }).error(function(error) {
            console.log("Error getting data from categories");
            console.log(error);
        });
    }

});
