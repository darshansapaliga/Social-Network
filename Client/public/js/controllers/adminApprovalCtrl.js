developmentApp.controller('AdminApprovalsController', function($scope, $state, $http) {

    console.log("in admin approvals");
    //user signup validation section
    $scope.formshow = true;

    $scope.formData = {};

    //get current user details
    $http({
      method : "GET",
      url : '/api/currentUser'
    }).success(function(data) {
      if(data){
            $scope.currentUser = data;
            if(data.userAccessLevel != "admin")
                $state.go("home");
        }else{
            $state.go("home");
        }
    }).error(function(error) {
      console.log("Error posting data in currentUser");
      console.log(error);
    });


    $http({
      method : "GET",
      url : '/api/getServicesForApprovals'
    }).success(function(data) {
        console.log("in success getServicesForApprovals");
      if(data.code == 200){

          $scope.serviceToApprove = data.data;
          console.log($scope.serviceToApprove);

        }else{
            alert("There was an error in getting approvals. Please try again");
        }
    }).error(function(error) {
      console.log("Error getting all services");
      console.log(error);
    });


    $scope.approveRequest = function(serviceId) {

        $http({
          method : "POST",
          url : '/api/updateServiceStatus/'+serviceId
        }).success(function(data) {
          if(data.code == 200){
                $state.go("home.categories");
            }else{
                alert("There was an error in updating the status. Please try again");
            }
        }).error(function(error) {
          console.log("Error posting data in currentUser");
          console.log(error);
        });

    }



});
