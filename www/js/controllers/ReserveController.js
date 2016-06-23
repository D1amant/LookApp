app.controller('ReserveController' , function ($scope, $ionicModal, $timeout, $state) {
   // Perform the login action when the user submits the login form
   $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.openModal = function() {
   $scope.modal.show();
 };
});