var db = null;
var sqlite = angular.module('sqlite', ['ionic', 'ngCordova']);

sqlite.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
  	if (window.cordova){
  		try{
  	 	   db = $cordovaSQLite.openDB({ name: "my.db" });
   	 	   $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS user (id integer primary key AUTOINCREMENT, name varchar(100), email varchar(45),phone varchar(20) , password varchar(255) )");
  		}catch (error) {
   	     console.log("sqlite : "+error);
   	  }
   }
  });
});



sqlite.factory('UserFactory', function($cordovaSQLite) {
  return {
    insert : function(name, email, phone , password) {
    	try{	
	    	  var query = "INSERT INTO user (name, email, phone , password) VALUES (?, ?, ?, ?);";
	    	  var values = [name, email, phone , password];
	
    	  $cordovaSQLite.execute(db, query, values).then(
    	    function(res) {
    	      console.log('INSERTED ID: '+res.insertId);
    	      return true;
    	    },
    	    function(err) {
    	      console.log('ERROR: '+err);
    	      return false;
    	    }
    	  );
  		}catch(error){
  			console.log(error);
  		}
    },
    select : function(id) {
     try{	
      var query = "SELECT * FROM user WHERE id=?";
      var values = [id];

      $cordovaSQLite.execute(db, query, values).then(
        function(res) {
          if (res.rows.length > 0) {
            var result = res.rows.item(0);
            console.log(res.rows.length + ' records, result: ' + result.name + ' ' + result.email + ' - ' + result.phone + ' - ' + result.password);
         	return result;
          } else {
            console.log('No records found');
          	return null;
          }
        }
      );
      }catch(error){
  			console.log(error);
  		}
    },

     getAll : function(id) {
     try{	
      var query = "SELECT * FROM user WHERE ";
      var values = [id];

      $cordovaSQLite.execute(db, query, values).then(
        function(res) {
          if (res.rows.length > 0) {
            var result = res.rows;
			   	return result;
          } else {
            console.log('No records found');
            return null;
          }
        }
      );
      }catch(error){
  			console.log(error);
  		}
    }


    
  };
});