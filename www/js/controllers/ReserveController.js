app.controller('ReserveController' , function ($scope, $ionicModal, $state, $stateParams , Studio ,Reserve , ReserveService) 
{
   // Perform the login action when the user submits the login form
    
  	$scope.reserve = [];
	$scope.submit = function(reserve)
 	{
 	  $scope.reserve = reserve;
      var result = Reserve.add($scope.reserve);
    
      if(result){
        try{ 
           var result = ReserveService.saveReserve($scope.reserve);
           result.success(function (data) {
     	   	    console.log(data);
          	});
         }catch(error){
           console.log(error); 
         }
     };	
 	};


   	Studio.getStudio($stateParams.id).then(function(res) {
      $scope.studio = res.rows.item(0);
      $scope.studio.collaborator = $scope.studio.collaborator.split(",");
  		
      console.log($scope.studio);
    });

 

 
});