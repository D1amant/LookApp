var modle = angular.module('starter.controllers', ['ionic', 'ngCordova']);

modle.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaSQLite,$state,$http ) {

      $scope.login = []; 
    $scope.submit = function(login)
    {

          var headers = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Credentials': 'true'
      };

            // Simple GET request example:
$http({
  method: 'GET',
  url: 'https://viacep.com.br/ws/91240090/json', 

}).success(function(response) {
    // this callback will be called asynchronously
    // when the response is available
          alert(response.cep);
  }).error( function errorCallback(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    
          console.log(data);
          console.log(status);
          console.log(headers);
          console.log(config);
  });



        $state.go("menu.home");
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
    $scope.validation = function(login){
      var validation = true;
      if(login.email == null || login.email == ""){
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
modle.controller('MenuCtrl' , function ($scope, $ionicModal, $timeout, $state ,$cordovaSQLite ,$ionicPlatform ) {
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

modle.controller('HomeCtrl' , function ($scope, $ionicModal, $timeout, $state,$cordovaSQLite ,$ionicPlatform ) {


  // body...
});


modle.controller('CadastreCtrl' ,  function ($scope , $state ,$cordovaSQLite) 
{
  $scope.style = "border-color:red ;";
  $scope.cadastre = [];
    //
    $scope.submit = function(cadastre)
    {
     if($scope.validation(cadastre))
     {
        $scope.insertUser (cadastre);
     }
   };


 $scope.insertUser = function (cadastre ){

       try{  
        var query = "INSERT INTO user (name, email, phone , password, created_at ,status ) VALUES (?, ?, ?, ? , ?, ?);";
        var values = [cadastre.name, cadastre.email, cadastre.phone , cadastre.password ,"date('now')" , '1'];
        resid = null;
        $cordovaSQLite.execute(db, query, values).then(
          function(res) {
            console.log('res :'+res.insertId);

            $scope.insertSection(res.insertId , cadastre);
          },
          function(err) {
            console.log('ERROR: '+err);
            //return null;
          }
          );
      }catch(error){
        console.log(error);
      }
    };



 $scope.insertSection = function (id , cadastre ){
        try{  
          var query = "INSERT INTO section ( id,idUser , name, email, phone , password , created_at , status) VALUES (?, ?, ?, ? , ?, ? , ? , ?);";
          var values = ['1', id  , cadastre.name, cadastre.email, cadastre.phone , cadastre.password ,"date('now')" , '1' ];
  
        $cordovaSQLite.execute(db, query, values).then(
          function(res) {
            console.log('INSERTED ID: '+res);
            $state.go("menu.home"); 
          },
          function(err) {
            console.log('ERROR: '+err);
          
          }
        );
      }catch(error){
        console.log(error);
      }
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