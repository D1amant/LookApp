app.factory("User", function ($cordovaSQLite) {

	var _insertSection = function (id , cadastre ){
        var validation = true ;
        try{  
          var query = "INSERT INTO section ( id,idUser , name, email, phone , password , created_at , status) VALUES (?, ?, ?, ? , ?, ? , ? , ?);";
          var values = ['1', id  , cadastre.name, cadastre.email, cadastre.phone , cadastre.password ,"date('now')" , '1' ];
  		  var result =  $cordovaSQLite.execute(db, query, values);
		 
      }catch(error){
        console.log(error);
      	validation = false;
      }
      return validation;
    };

   var _insertUser = function (cadastre){

        var query = "INSERT INTO user (name, email, phone , password, created_at ,status ) VALUES (?, ?, ?, ? , ?, ?);";
        var values = [cadastre.name, cadastre.email, cadastre.phone , cadastre.password ,"date('now')" , '1'];
       
       var result = $cordovaSQLite.execute(db, query, values);

      return result ;
    };

   var _selectUser = function (email , password){
       console.log(email + password);
       //
        var query = "SELECT * FROM user WHERE email = ? and password = ?";
        var values = [email , password];
        var result =   $cordovaSQLite.execute(db, query, values);
        console.log(result);
          return result;
    };

	return {
		insertUser: _insertUser,
    insertSection: _insertSection,
		getUser: _selectUser
	};
});