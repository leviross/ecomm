app.factory('UserService', ['$http', '$location', function($http, $location){

	'use strict'
	var cachedUsersArr = []; 
	var currentUser = null;
    var sessionToken = sessionStorage.getItem('Token');
   	var sessionUser = sessionStorage.getItem('User');

	return {

		GetAllUsers: function(cb){
			var self = this;
			return $http.get('http://localhost:4000/api/users')
				.then(function(result){
					cb(result.data);
					self.PutCachedUsers("UsersArray", result.data);
				}, function(err){
					console.log("Error getting all users:\n", err);
				});
		},
		CreateNewUser: function(userObj, cb){
			return $http.post('http://localhost:4000/api/users', userObj)
				.then(function(result){
					cb(result.data);
				}, function(err){
					console.log("Error creating user:\n", err);
				})
		},
		UpdateUser: function(userObj, cb){
			userObj.Token = sessionToken;
			return $http.put('http://localhost:4000/api/users/' + userObj._id, userObj)
				.then(function(result){
					cb(result);
				}, function(err){
					console.log("Error updating user password:\n", err);
				});	
		},
		DeleteUser: function(id, cb){
			return $http.delete('http://localhost:4000/api/users/' + id)
				.then(function(result){
					cb(result.data);
				}, function(err){
					cb(err);
				});
		},
		ResetPassword: function(email, cb){
			return $http.put('http://localhost:4000/api/users/reset-password/' + email)
				.then(function(result){
					cb(result);
				}, function(err){
					console.log(err);
				});
		},
		PutCachedUsers: function(key, value){
			//was using $cacheFactory, but doesn't keep data on page reload.
			cachedUsersArr = value;
			sessionStorage.setItem(key, JSON.stringify(value));
		},
		GetCachedUsers: function(key){	
			if(cachedUsersArr.length !== 0){
				return cachedUsersArr;
			}else if(!sessionStorage.UsersArray){
				return null
			}else if(sessionStorage.UsersArray){
				var parsedJsonArr = JSON.parse(sessionStorage.getItem(key));
				cachedUsersArr = parsedJsonArr;
				return cachedUsersArr;	
			}
		},
		PutLoggedInUser: function(user, token){
			sessionStorage.setItem('Token', token);
           	sessionStorage.setItem('User', JSON.stringify(user));
			sessionToken = sessionStorage.getItem('Token');
			currentUser = user;
			currentUser.Token = sessionToken;
		},
		GetLoggedInUser: function(){
			if(currentUser) {
				return currentUser;
			}else if(sessionUser){
				var parsedSessionUser = JSON.parse(sessionUser);
				parsedSessionUser.Token = sessionToken;
				currentUser = parsedSessionUser;
				return currentUser;
			}else{
				return null;
			}
		},
		Logout: function(){
			currentUser = null;
    		sessionStorage.setItem('Token', "");
    		sessionStorage.setItem('User', "");
    		alertify.notify('You are logged off.', 'warning', 5, function(){});
    		$location.path('/')
		}

	}


}]);