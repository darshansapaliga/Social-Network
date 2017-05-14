developmentApp.controller('UserController', function($scope, $state, $http) {

    //user signup validation section
    $scope.formshow = true;

    $scope.formData = {};

    //get current user details
    $http({
      method : "POST",
      url : '/api/currentUser'
    }).success(function(data) {
      if(data){
            $scope.currentUser = data;
            var date = new Date(data.birthday),
                month = date.getMonth(),
                year = date.getYear(),
                day = date.getDate();
            console.log(year);
            var fullBirthday = month+'/'+day+'/'+year;
            $scope.fullBirthday = fullBirthday;

            //send user to services page
            $state.go("home.services");
        }else{
            $state.go("home");
        }
    }).error(function(error) {
      console.log("Error posting data in currentUser");
      console.log(error);
    });



    //user login
    $scope.formshowchange = function(a) {
      $scope.formshow = a;
    };





    /*
     |-----------------------------------------------------------
     | User login signup
     |-----------------------------------------------------------
    */

    //user login
    $scope.login = function() {

      console.log("hello in login");
      console.log($scope.formData.loginemail);
      console.log($scope.formData.loginpassword);

        $http({
          method : "POST",
          url : '/api/login',
          data : {
            "email": $scope.formData.loginemail,
            "password": $scope.formData.loginpassword
          }
        }).success(function(data) {
          if(data == "email")
            alert("Email already associated with another account");
          else if(data == "password")
            alert("password incorrect");

            if(data.email !== null){
              $scope.currentUser = data;
                $state.go("home.services");
            }else{
                alert("Error in login please try again");
            }

        }).error(function(error) {
          console.log("Error posting data in login");
          console.log(error);
        });
    };

    //user signup
    $scope.signup = function() {

      var data = {
        "firstName": $scope.formData.firstname,
        "lastName": $scope.formData.lastname,
        "email": $scope.formData.signupemail,
        "password": $scope.formData.signuppassword,
        "contactNo": $scope.formData.contactnumber,
      }


      $http({
        method : "POST",
        url : '/api/signup',
        data : data
      }).success(function(data) {
        console.log("success signup");
        console.log(data);
        if(data == "email")
          alert("Email already associated with another account");
        else
          $scope.formshow = true;
      }).error(function(error) {
        console.log("Error posting new user");
        console.log(error);
      });
    };

    //user logout
    $scope.logout = function() {
      $http({
        method : "POST",
        url : '/api/logout'
      }).success(function(data) {

          $state.go("home");

      }).error(function(error) {
        console.log("Error in logout");
        console.log(error);
      });
    };



    $scope.toServices = function() {
        $state.go("home.services");
    };


});
