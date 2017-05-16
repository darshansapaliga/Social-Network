developmentApp.controller('ServiceFormController', function($scope, $state, $stateParams, $http) {

    $scope.specializations = [];
    //get user from session
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


    //get all categories
    $http({
      method : "GET",
      url : '/api/getCategories'
    }).success(function(data) {
        console.log("in get categories");
        console.log(data);
      if(data.code == 200){
          var categories = data.data;
            if(categories)
                for(var i=0; i<categories.length; i++) {
                    for(var j=0; j<categories[i].specialization.length; j++)
                        $scope.specializations.push(categories[i].specialization[j]);
                }
            console.log($scope.specializations);
        }else {
            categories = null;
            alert("There was some error in retrieving categories. Please try again.");
        }
    }).error(function(error) {
      console.log("Error getting data from categories");
      console.log(error);
    });


    $scope.submitproblem = function() {

        data = {
            name: $scope.formData.problemname,
            contact: $scope.formData.usercontact,
            address: $scope.formData.useraddress,
            description: $scope.formData.problemdescription,
            userId: $scope.currentUser._id,
            specialization: $scope.formData.specialization,
            categoryId: $state.params.categoryId
        }

        $http({
          method : "POST",
          url : '/api/userproblem',
          data : data
        }).success(function(data) {

            if(data.code == 200)
                $state.go("home.categories");
            else
                alert("There was an error in submitting your problem. Please try again");

        }).error(function(error) {
          console.log("Error posting data in user problem");
          console.log(error);
        });

    }

});
