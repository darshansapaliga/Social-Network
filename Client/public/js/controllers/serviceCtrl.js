developmentApp.controller('ServiceController', function($scope, $state, $stateParams, $http) {

    $scope.noservicefound = false;

    // get current user details
    $http({
      method : "GET",
      url : '/api/currentUser'
    }).success(function(data) {

      if(data){
        $scope.currentUser = data;

        if($scope.currentUser.userAccessLevel != "admin") {
            alert("You do not have access to this page");
            $state.go("home.services");
        }

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
      method : "GET",
      url : '/api/services/'+$state.params.categoryId
    }).success(function(data) {

      if(data.code == 200)
          $scope.services = data.data;
      else
        $scope.noservicefound = true;

    }).error(function(error) {
      console.log("Error in get all services");
      console.log(error);
    });




    $scope.editService = function() {
        data = {
            servicename : $scope.formData.servicename,
            address : $scope.formData.address,
            contact : $scope.formData.contact,
            description : $scope.formData.description,
            categoryId: $state.params.categoryId
        };

        $http({
        method : "POST",
        url : '/api/editService',
        data : data
        }).success(function(data) {

            if(data.code == 200)
            $state.go("home.services", {categoryId: $state.params.categoryId});
            else
            alert("Error in editing service. Please try again");

        }).error(function(error) {
            console.log("Error in edit services");
            console.log(error);
        });
    }




    //route methods
    $scope.createservice = function() {
        $state.go("home.addservices");
    }

    $scope.toservicepage = function(serviceId) {
        if($scope.currentUser) {
            if($scope.currentUser.userAccessLevel == "moderator" || $scope.currentUser.userAccessLevel == "admin")
                $state.go("home.service", {serviceId: serviceId});
            else
                $state.go("home.services", {categoryId: $state.params.categoryId});
        }else {
            $state.go("home");
        }
    }

});
