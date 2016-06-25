app.controller('UserController', function($scope, $cordovaSQLite,$state,$http ,User) {

    
$scope.submit = function(login)
 {

          console.log(login.email + login.password);

        try{  
         var result = User.getUser(login.email , login.password);
         result.then(
           function(res) {
            console.log(res);
             console.log('ROEWS: '+res.rows.item(0).name);
             if (res.rows.length > 0) 
             {
                var validate = User.insertSection(res.rows.id , res.rows.item(0));
                 console.log(validate);
                 if(validate){
                   $state.go("menu.home"); 
                 }
             }
            },
            function(err) {
              console.log('SQLERROR: '+err);
              //return null;
           });
         }catch(error){
           console.log(error);
         }
 };






 





});