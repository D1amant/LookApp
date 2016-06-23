app.controller('MenuCtrl' , function ($scope, $ionicModal, $timeout, $state ,$cordovaSQLite ,$ionicPlatform ) {
   // Perform the login action when the user submits the login form
   $scope.openReserve = function($scope) {

    $state.go("menu.reserve"); 

  };
    $scope.logout = function(){
    try{  
      var query = "DELETE FROM section WHERE id = ?";
      var values = [1];
       $cordovaSQLite.execute(db, query, values).then(
        function(res) {
           $state.go("app");
        });
      }catch(error){
        console.log(error);
      }
    };
});