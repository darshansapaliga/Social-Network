developmentApp.controller('EditServiceController', function($scope, $state, $http) {

    $scope.formData = {};

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
            $scope.formData = data.data;
        }else {
            $scope.service = null;
            alert("There was some error in retrieving service. Please try again.");
        }
    }).error(function(error) {
      console.log("Error getting data from categories");
      console.log(error);
    });


    $scope.updateService = function() {
        data = {
            serviceId : $state.params.serviceId,
            name : $scope.formData.name,
            address : $scope.formData.address,
            contact : $scope.formData.contact,
            description : $scope.formData.description,
            membersToAdd : $scope.formData.newMembers
        }

        $http({
          method : "POST",
          url : '/api/updateService',
          data : data
        }).success(function(data) {
            console.log("in update service");
            console.log(data);
          if(data.code == 200){
                $scope.service = data.data;
                $state.go("home.moderatorServices");
            }else {
                $scope.service = null;
                alert("There was some error in retrieving service. Please try again.");
            }
        }).error(function(error) {
          console.log("Error updateService");
          console.log(error);
        });
    }




});
