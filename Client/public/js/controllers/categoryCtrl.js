developmentApp.controller('CategoryController', function($scope, $state, $rootScope, $http) {

    console.log("in category controller");
    $scope.categoryChoiceSelected = "new";
    $scope.categorynamealreadyexist = false;
    $scope.servicenamealreadyexist = false;


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
            $scope.categories = data.data;
        }else {
            $scope.categories = null;
            alert("There was some error in retrieving categories. Please try again.");
        }
    }).error(function(error) {
      console.log("Error getting data from categories");
      console.log(error);
    });





    $scope.addServiceAndCategory = function() {

        console.log("in add cluster and category");

        data = {
            servicename : $scope.formData.servicename,
            address : $scope.formData.address,
            contact : $scope.formData.contact,
            description : $scope.formData.description,
            moderator : $scope.currentUser._id
        };

        //check if new category is entered or from an existing category
        if($scope.categoryChoiceSelected == "existing") {
            data.categoryChoice = true; //if category choice = true - category is from existing or else new category entered
            data.categorySelected = $scope.formData.categorySelected;
        }

        if($scope.categoryChoiceSelected == "new"){ //name has to be unique

            //check for unique name
            var found = $scope.categories.some(function(e1){
                e1.name === $scope.formData.categoryEntered;
            });
            if(!found) {
                console.log("same value not found");
                data.categoryChoice = false;
                data.categoryEntered = $scope.formData.categoryEntered;
            }else{
                return $scope.categorynamealreadyexist = true;
            }
        }

        console.log(data);

        $http({
            method : 'POST',
            url : '/api/postServiceAndCategory',
            data : data
        }).success(function(data){

            console.log("success add category and services");
            console.log(data);

            //on success if user type is update user change to moderator
            if($scope.currentUser.userAccessLevel == 'user') {

                $http({
                  method : "POST",
                  url : '/api/updateUserAccessLevel/'+$scope.currentUser._id
                }).success(function(data) {

                    if(data.response.code == 200)
                        $state("home.categories");

                }).error(function(error) {
                  console.log("Error updating user");
                  console.log(error);
                });

            }else {
                $state.go("home.categories");
            }



        }).error(function(error){
            console.log("in addd serivce and category error");
            console.log(error);
        });


    }


    // routes section
    $scope.toCategoryPage = function() {
        $state.go("home.addCategory");
    }

    $scope.toServicesPage = function(categoryId) {
        $state.go("home.clusters", {categoryId: categoryId});
    }



});
