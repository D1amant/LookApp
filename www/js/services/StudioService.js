app.factory("StudioService", function ($http) {
	var _getStudio = function () {
		return $http.get("http://localhost/json.php");
	};

	var _saveStudio= function (contato) {
		return $http.post("http://localhost/json.php");
	};

	return {
		getStudio: _getStudio,
		saveStudio: _saveStudio
	};
});