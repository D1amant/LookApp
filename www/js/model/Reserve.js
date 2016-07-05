app.factory("Reserve", function ($cordovaSQLite) {

   var _insertReserve = function (data){
      var validate =  true;
      try{

          var query = "INSERT INTO reserve (date , time, collaborator , user_id , deleted , created_at ,status) VALUES  (?,?, ?, ?, ?, ? , ?);";
          var values = [data.date ,data.time, data.collaborator, data.user_id, '0'  ,"date('now')" , '1'];
          $cordovaSQLite.execute(db, query, values);
        
       }catch(error)
       {
        console.log(error);
          validate =  false;
       }  
       
       return validate;
    
    };

   var _selectReserve = function (id){       
        var query = "SELECT * FROM reserve";
        if(id != null)
        {
          var values = [id];
          query = query+" WHERE id = ?";
        }else
        {
          var values = null;
        }
        console.log(query);
          var result =   $cordovaSQLite.execute(db, query, values);
          return result;
    };

var createStringByArray = function (array) {
    var output = '';
    angular.forEach(array, function (object) {
        angular.forEach(object, function (value, key) {
            
            output += value + ',';
        });
    });
    return output;
};

	return {
		add: _insertReserve,
		getReserve: _selectReserve
	};
});