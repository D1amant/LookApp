app.factory("ReserveService", function ($http) {
 	
   var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

	var _getReserve = function () {
		return $http.get("http://192.168.0.14/json.php");
	};

	var _saveReserve = function (data) {
		
	
		return $http.post("http://192.168.0.14/jsonPost.php", {'date' : data.date ,'time' : data.time , 'user_id' : data.user_id , 'collaborator' : data.collaborator } ,config);
	};

	return {
		getReserve: _getReserve,
		saveReserve: _saveReserve
	};
});