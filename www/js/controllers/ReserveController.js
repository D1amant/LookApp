app.controller('ReserveController' , function ($scope, $ionicModal, $timeout, $state, $stateParams , Studio) {
   // Perform the login action when the user submits the login form
   
   	Studio.getStudio($stateParams.id).then(function (res) {
      $scope.name = res.rows.item(0).name;
      $scope.phone = res.rows.item(0).phone;
      $scope.address = res.rows.item(0).address;
  
      console.log(res.rows.item(0).name);
    });

 

 
});