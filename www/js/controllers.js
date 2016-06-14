var modle = angular.module('starter.controllers', []);

modle.controller('AppCtrl', function($scope, $ionicModal, $timeout, SectionFactory,$state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

   var ressult = SectionFactory.select(1);
   if(ressult != null ){
          $state.go("menu.home"); 
   }
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $state.go("menu.home"); 
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
});
modle.controller('MenuCtrl' , function ($scope, $ionicModal, $timeout, $state) {
   // Perform the login action when the user submits the login form
  $scope.openReserve = function($scope) {
  
    $state.go("menu.reserve"); 
   
  };
});
modle.controller('ReserveCtrl' , function ($scope, $ionicModal, $timeout, $state) {
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

modle.controller('HomeCtrl' , function ($scope, $ionicModal, $timeout, $state) {
  // body...
});


modle.controller('CadastreCtrl' ,  function ($scope ,SectionFactory,UserFactory, $state) {
    var phone = $scope.phone;
    $scope.style = "border-color:red ;";
    $scope.list = [];
    $scope.cadastre = [];
    //
    $scope.submit = function(cadastre)
    {
       if($scope.validation(cadastre)){
        var id = UserFactory.insert(cadastre.name, cadastre.email, cadastre.phone, cadastre.password);
            console.log("idUser : "+id);
          if(id != null){
            SectionFactory.insert(UserFactory.serlect(id));
            $state.go("menu.home");
           } 
       }
      //alert($scope.phone);
      //$scope.list.push(cadastre.phone);
       // UserFactory.select(5);
       //UserFactory.select(6);
        //$scope.user = User.all();
        //console.log($scope.user.name);
   };

     $scope.validation = function(cadastre){
      var validation = true;
        if(cadastre.name == null || cadastre.name == ""){
            $scope.styleInputName = "border-color:red;";
          validation = false;
        }else{
            $scope.styleInputName = "";
        }

        if(cadastre.email == null || cadastre.email == ""){
            $scope.styleInputEmail = "border-color:red;";
          validation = false;
        }else{
            $scope.styleInputEmail = "";
        }

        if(cadastre.phone == null || cadastre.phone == ""){
            $scope.styleInputPhone = "border-color: red;";
          validation = false;
        }else{
            $scope.styleInputPhone = "";
        }


        if(cadastre.password == null || cadastre.password == ""){
            $scope.styleInputPassword = "border-bottom-color: red;";
          validation = false;
        }else{
            $scope.styleInputPassword = "";
        }
        return validation;
    };
  }
 
);


modle.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
});

modle.controller('PlaylistCtrl', function($scope, $stateParams) {


});

modle.controller('UserCtrl', function($scope, User, UserFactory) {

        //cadastro dois registros
  UserFactory.insert('Erik', 'teste@teste', 'qweqweqwe', 'qeqweqwe');


        //retorno dois registros
  UserFactory.select(1);
  UserFactory.select(2);
  $scope.user = User.all();
  $scope.remove = function(chat) {
    User.remove(chat);
  };
});