app.factory('interactionsFactory', ['$http' , function ($http) {
	
	const INTERACTIONS = "data/interactions.json";
	
	var factoryInt = {};

	var listInteractions = null;

	factoryInt.list = function(){

		if(listInteractions == null){
			listInteractions = $http.get(INTERACTIONS);
		}

		return listInteractions;
	}

	return factoryInt;
}]);