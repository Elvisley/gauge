app.factory('brandsFactory', ['$http' , function ($http) {
	
	const BRANDS = "data/brands.json";	
	
	var factoryBrand = {};

	var listBrands = null;

	factoryBrand.list = function(){
		
		if(listBrands == null){
			listBrands = $http.get(BRANDS);
		}	
		
		return listBrands;
	}

	return factoryBrand;
}]);