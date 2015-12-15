angular.module('EcommApp')
.controller('HeaderController', ['$scope', '$rootScope', '$location', '$http', '$location', 'UserService', function($scope, $rootScope, $location, $http, $location, UserService){

	$scope.Cart = [];

	var sessionUser = sessionStorage.getItem('User');

	if(sessionUser == "" || sessionUser == "undefined"){
		$scope.User = null;
	}else{
		$scope.User = JSON.parse(sessionUser);
	}

	//$scope.User = UserService.GetLoggedInUser();
	
	$scope.$on('UserLoggedIn', function(event, user){
		$scope.User = user;
	});

	$scope.GoToLogin = function(){
		$location.path('/login');
	}
    


}]);