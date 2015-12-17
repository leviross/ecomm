app.controller('ResetPasswordController', ['$scope', 'UserService', '$routeParams', '$location', function($scope, UserService, $routeParams, $location){

	var routeParams = $routeParams;
	if(routeParams.id){
		routeParams.User = {_id: routeParams.id};
		console.log(routeParams);

		UserService.PutLoggedInUser(routeParams.User, routeParams.token);

		$location.url('/reset-password');
	}
	

	$scope.ResetPassword = function(){
		var userObj = UserService.GetLoggedInUser();
		userObj.Password = $scope.Password;
		UserService.ChangeUserPassword(userObj, function(result){
			alertify.notify('Password changed, please login.', 'success', 5, function(){});
			$location.path('/login');
		});

	}


}]);