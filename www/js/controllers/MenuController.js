app.controller('MenuCtrl' , function ($scope,Studio ,StudioService, $ionicModal, $timeout, $state ,$cordovaSQLite ,$ionicPlatform ) {
   // Perform the login action when the user submits the login form

   StudioService.getStudio().success(function (data) {
      $scope.studios = data;
     
      var result = Studio.add(data);
   
    });

    $scope.openReserve = function(id,$scope) {
      $state.go("reserve" , {'id':id}); 
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