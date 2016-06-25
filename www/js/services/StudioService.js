app.factory("StudioService", function ($http) {
	var _getStudio = function () {
		return $http.get("http://192.168.0.14/json.php");
	};

	var _saveStudio = function (contato) {
		return $http.post("http://192.168.0.14/json.php");
	};

	return {
		getStudio: _getStudio,
		saveStudio: _saveStudio
	};
});