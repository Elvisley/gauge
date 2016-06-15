app.service('userService', ['$http','userFactory','$q', function ($http , userFactory , $q) {
	
	function getUser(id_user){
		var deferred = $q.defer();

		var usersJson = userFactory.list().success(function(data){
			var modelUser = data.filter(function(obj){
				return obj.id == id_user
			});			
			deferred.resolve(modelUser[0]);
		});

		return deferred.promise;
	}
	

	return {
		getUser: getUser
	}
}]);

