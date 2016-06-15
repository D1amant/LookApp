var db = null;
var sqlite = angular.module('sqlite', ['ionic', 'ngCordova']);

sqlite.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
  	if (window.cordova){
  		try{
  	 	   db = $cordovaSQLite.openDB({ name: "my.db" });
   	 	   $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS user (id integer primary key AUTOINCREMENT, name varchar(100), email varchar(45),phone varchar(20) , password varchar(255) , status BOOLEAN ,created_at varchar(15))");
   	 	   $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS section (id integer primary key, idUser integer, name varchar(100), email varchar(45),phone varchar(20) , password varchar(255) , status BOOLEAN ,created_at varchar(15))");
   	 	   $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS reserve (id integer primary key AUTOINCREMENT, idUser integer, id_type_worck integer, date varchar(15),time varchar(15) , status BOOLEAN, deleted BOOLEAN ,created_at varchar(15))");
  		}catch (error) {
   	     console.log("sqlite : "+error);
   	  }
   }
  });
});



sqlite.factory('UserFactory', function($cordovaSQLite) {
  return {
    insert : function(name, email, phone , password) {
    	id = null;
      self = this;
    	try{	
	    	  var query = "INSERT INTO user (name, email, phone , password, created_at ,status ) VALUES (?, ?, ?, ? , ?, ?);";
	    	  var values = [name, email, phone , password ,"date('now')" , '1'];
	
    	  $cordovaSQLite.execute(db, query, values ).then(
    	    function(res) {
    	      console.log('res :'+res.insertId);
    	      self.id = res.insertId;
    	    },
    	    function(err) {
    	      console.log('ERROR: '+err);
    	    }
    	  );
  		}catch(error){
  			console.log(error);
  		}

  		  return self.id;
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


  sqlite.factory('SectionFactory', function($cordovaSQLite) {
  return {
    insert : function(obj) {
    	try{	
	    	  var query = "INSERT INTO user ( id,idUser , name, email, phone , password , created_at , status) VALUES (?, ?, ?, ? , ?, ?);";
	    	  var values = ['1', obj.idUser , obj.name, obj.email, obj.phone , obj.password ,"date('now')" , '1' ];
	
    	  $cordovaSQLite.execute(db, query, values).then(
    	    function(res) {
    	      console.log('INSERTED ID: '+res);
    	      return res;
    	    },
    	    function(err) {
    	      console.log('ERROR: '+err);
    	      return null;
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
    },
    logout : function(id) {
     try{	
      var query = "update section SET status = 0 WHERE idUSer = ?";
      var values = [id];

      $cordovaSQLite.execute(db, query, values).then(
          function(res) {
    	      console.log('Logout IDUser: '+res.insertId);
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
  };
});