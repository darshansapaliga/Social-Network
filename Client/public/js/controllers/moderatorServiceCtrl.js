developmentApp.controller('ModeratorServiceController', function($scope, $state, $http) {

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



    //get all moderator services
    $http({
      method : "GET",
      url : '/api/moderatorServices/'+$scope.currentUser._id
    }).success(function(data) {

      if(data.code == 200)
          $scope.services = data.data;
      else
        $scope.noservicefound = true;

    }).error(function(error) {
      console.log("Error in get all services");
      console.log(error);
    });

    $scope.toservicepage = function(serviceId) {
        $state.go("home.editService", {serviceId: serviceId});
    }

});
