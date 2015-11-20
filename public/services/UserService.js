app.factory('UserService', ['$http', function($http){

	return {

		GetAllUsers: function(cb){
			return $http.get('http://localhost:4000/api/users')
				.then(function(retval){
					cb(retval.data);
				}, function(err){
					console.log("Error getting all users:\n", err);
				});
		}

	}


}]);