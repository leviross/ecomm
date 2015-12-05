app.factory('UserService', ['$http', '$cacheFactory', function($http, $cacheFactory){

	'use strict'
	var cachedVar; 

	return {

		GetAllUsers: function(cb){
			var self = this;
			return $http.get('http://localhost:4000/api/users')
				.then(function(retval){
					cb(retval.data);
					self.PutCachedUsers("UsersArray", retval.data);
				}, function(err){
					console.log("Error getting all users:\n", err);
				});
		},
		CreateNewUser: function(userObj, cb){
			return $http.post('http://localhost:4000/api/users', userObj)
				.then(function(retval){
					cb(retval.data);
				}, function(err){
					console.log("Error creating user:\n", err);
				})
		},
		ChangeUserPassword: function(userObj, cb){
			return $http.put('http://localhost:4000/api/users/update-pass/' + userObj._id)
				.then(function(retval){
					cb(retval);
				}, function(err){
					console.log("Error updating user password:\n", err);
				});
		},
		PutCachedUsers: function(key, value){
			//was using $cacheFactory, but doesn't keep data on page reload.
			sessionStorage.setItem(key, value);
		},
		GetCachedUsers: function(key){	
			JSON.parse(sessionStorage.getItem(key));
			if(!sessionStorage.getItem(key)) return null;
			return sessionStorage.getItem(key);
		}

	}


}]);