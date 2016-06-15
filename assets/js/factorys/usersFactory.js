app.factory('userFactory', ['$http' , function ($http) {
	
	const USERS = "data/users.json";

	var listUsers = null;
	
	var factoryUser = {};

	factoryUser.list = function(){

		if(listUsers == null){
			listUsers = $http.get(USERS);
		}

		return listUsers;
	}

	return factoryUser;
}]);