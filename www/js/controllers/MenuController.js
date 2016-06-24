app.controller('MenuCtrl' , function ($scope, StudioService, $ionicModal, $timeout, $state ,$cordovaSQLite ,$ionicPlatform ) {
   // Perform the login action when the user submits the login form
 
 console.log( StudioService.getStudio());
   StudioService.getStudio().success(function (data) {
      $scope.studios = data;
      console.log(data);
    });

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