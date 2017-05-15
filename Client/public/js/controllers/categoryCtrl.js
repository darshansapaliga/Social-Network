developmentApp.controller('CategoryController', function($scope, $state, $rootScope, $http) {

    $scope.categoryChoiceSelected = "new";
    $scope.specializationChoiceSelected = "new";
    $scope.specializationamealreadyexist = false;
    $scope.categorynamealreadyexist = false;
    $scope.servicenamealreadyexist = false;
    $scope.specialization = [];


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
      if(data.code == 200){
            $scope.categories = data.data;

            if($scope.categories)
                for(var i=0; i<$scope.categories.length; i++) {
                    for(var j=0; j<$scope.categories[i].specialization.length; j++)
                        $scope.specialization.push($scope.categories[i].specialization[j]);
                }
        }else {
            $scope.categories = null;
            alert("There was some error in retrieving categories. Please try again.");
        }
    }).error(function(error) {
      console.log("Error getting data from categories");
      console.log(error);
    });





    $scope.addServiceAndCategory = function() {

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
                data.categoryChoice = false;
                data.categoryEntered = $scope.formData.categoryEntered;
            }else{
                return ($scope.categorynamealreadyexist = true);
            }
        }

        //check if new specialization is entered or from an existing category
        if($scope.specializationChoiceSelected == "existing") {
            data.specializationChoice = true; //if specialization choice = true - specialization is from existing or else new specialization entered
            data.specializationSelected = $scope.formData.specializationSelected;
        }

        if($scope.specializationChoiceSelected == "new"){ //name has to be unique

            //check for unique name
            var found = $scope.specialization.some(function(e1){
                e1.name === $scope.formData.specializationEntered;
            });
            if(!found) {
                data.specializationChoice = false;
                data.specializationEntered = $scope.formData.specializationEntered;
            }else{
                return ($scope.specializationamealreadyexist = true);
            }
        }


        $http({
            method : 'POST',
            url : '/api/postServiceAndCategory',
            data : data
        }).success(function(data){

            $state.go("home.categories");

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
        if($scope.currentUser) {
            if($scope.currentUser.userAccessLevel == "user" || $scope.currentUser.userAccessLevel == "moderator") {
                $state.go("home.userproblem", {categoryId: categoryId});
            }
            if($scope.currentUser.userAccessLevel == "admin")
                $state.go("home.clusters", {categoryId: categoryId});
        }else {
            $state.go("home");
        }
    }



});
