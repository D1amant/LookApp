// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'ngCordova']);
var db = null;


app.run(function($ionicPlatform ,$cordovaSQLite , $state , $http ) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova  && window.cordova.plugin && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      //cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    

    if (window.cordova){
      try{
         db = $cordovaSQLite.openDB({ name: "my.db" });
         $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS user (id integer primary key AUTOINCREMENT, name varchar(100), email varchar(45),phone varchar(20) , password varchar(255) , status BOOLEAN ,created_at varchar(15))");
         $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS section (id integer primary key, idUser integer, name varchar(100), email varchar(45),phone varchar(20) , password varchar(255) , status BOOLEAN ,created_at varchar(15))");
         $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS reserve (id integer primary key AUTOINCREMENT, idUser integer, id_type_worck integer, date varchar(15),time varchar(15) , status BOOLEAN, deleted BOOLEAN ,created_at varchar(15))");
         $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS studio (id integer primary key AUTOINCREMENT, name varchar(255) , description text, phone varchar(255) , address varchar(255) , status BOOLEAN ,created_at varchar(15))");
         $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS task (id integer primary key AUTOINCREMENT, title varchar(255) , created_at varchar(15) , status BOOLEAN");
         $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS studio_task (id integer primary key AUTOINCREMENT, studio_id integer ,task integer , created_at varchar(15) , status BOOLEAN ");
         $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS calendar (id integer primary key AUTOINCREMENT  , studio_id integer , user_id , task_id integer ,  date varchar(15) ,time varchar(255) , created_at varchar(15) , status BOOLEAN ");
     
       var query = "SELECT * FROM section WHERE id=?";
       var values = [1];
  
    $cordovaSQLite.execute(db, query, values ,  $state).then(
        function(res) {
          if (res.rows.length > 0) {
           $state.go("menu.home");  
            
          } else {
            console.log('No records found');
            
          }
        }
      );
      }catch (error) {
         console.log("sqlite : "+error);
      }
    }
  });

  
});

app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common = 'Content-Type: application/json';
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

app.config(function($stateProvider, $urlRouterProvider ) {
  $stateProvider.state('app', {
    url: '/app',
    abstract: false,
    templateUrl: 'templates/login.html',
    controller: 'UserController'
  });

  $stateProvider.state('menu', {
    url: '/menu',
    abstract: false,
    templateUrl: 'templates/menu.html',
    controller: 'MenuCtrl'
  });

    $stateProvider.state('cadastre', {
    url: '/cadastre',
    abstract: false,
    templateUrl: 'templates/cadastre.html',
    controller: 'CadastreController'
  });

  $stateProvider.state('menu.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  });

 $stateProvider.state('menu.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html'
      }
    }
  });

 $stateProvider.state('menu.reserve', {
    url: '/reserve',
    views: {
      'menuContent': {
        templateUrl: 'templates/reserve.html'
      }
    }
  });



  $stateProvider.state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app');

});
