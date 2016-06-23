app.controller('UserController', function($scope, $ionicModal, $timeout, $cordovaSQLite,$state,$http ) {

    
$scope.submit = function(login)
 {

  
      if($scope.validation(login)){
          console.log(login.email + login.password);
        try{  
        var query = "SELECT * FROM section WHERE email = '?' and password = '?'";
        var values = [login.email , login.password];
          $cordovaSQLite.execute(db, query, values).then(
           function(res) {
            console.log('ROEWS: '+res.rows[0]);
            if (res.rows.length > 0) 
            {
               $state.go("menu.home");
            }
           },
           function(err) {
            console.log('SQLERROR: '+err);
            //return null;
          });
         }catch(error){
           console.log(error);
         }
     
   }
 };

  $scope.validation = function(){
      var validation = true;
      if($scope.formlogin.email.$invalid){
        $scope.styleInputEmail = "border-bottom-color: red !important;";
        validation = false;
      }else{
        $scope.styleInputName = "";
      }

      if(login.password == null || login.password == ""){
        $scope.styleInputPassword = "border-bottom-color: red !important;";
        validation = false;
      }else{
        $scope.styleInputPassword = "";
      }
      return validation;
};
            // Simple GET request example:
     /*     $http({
            method: 'GET',
            url: 'http://10.10.10.77:80/json.php', 
          
          }).success(function(response) {
              // this callback will be called asynchronously
              // when the response is available
                    console.log(response.establishment.l1_1);
            }).error( function errorCallback(data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
              
                    console.log(data);
                    console.log(status);
                    console.log(headers);
                    console.log(config);
            });*/



 





});