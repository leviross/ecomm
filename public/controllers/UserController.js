app.controller('UserController', ['$scope', 'UserService', 'ValidationService', function($scope, UserService, ValidationService){

	$scope.DisplayMode = 'list';
	$scope.UserTypes = [{id: "1", name: "Admin", value: true}, {id: "2", name: "Non-Admin", value: false}];

	$scope.EditUser	= function (user) {
		$scope.DisplayMode = 'edit';
		$scope.UserDetails = user;
		$scope.UserDetails.NewPassword1 = "";
	}


	$scope.NewUser = function () {
		$scope.DisplayMode = 'edit';
		$scope.UserDetails = {
			FirstName: "",
			LastName: "",
			Email: "",
			Password1: "",
			Password2: "",
			IsAdmin: "2",
			_id: null,
			ShowChangePassword: true
		}
	}

	$scope.CheckFirstName = function(){
		$scope.UserDetails.FirstName = ValidationService.CapitalizeName($scope.UserDetails.FirstName);
	}
	$scope.CheckLastName = function(){
		$scope.UserDetails.LastName = ValidationService.CapitalizeName($scope.UserDetails.LastName);
	}

	$scope.CreateUser = function () {
		var NewUserObj = {FirstName: $scope.UserDetails.FirstName, LastName: $scope.UserDetails.LastName, Email: $scope.UserDetails.Email, Password: $scope.UserDetails.Password1, 
			IsAdmin: $scope.UserDetails.IsAdmin, IsEmployee: true}
		UserService.CreateNewUser(NewUserObj, function(retval){
			$scope.UserDetails = retval;
			//$scope.DisplayMode = 'list';
			$scope.UserForm.$setPristine();
			console.log(retval);
		});
		
	}	


	UserService.GetAllUsers(function (usersArray) {
			$scope.Users = usersArray;
		});

	$scope.ToggleChangePassword = function(){
		$scope.UserDetails.NewPassword1 = "";
		$scope.UserDetails.NewPassword2 = "";
		
		$scope.UserDetails.ShowChangePassword = !$scope.UserDetails.ShowChangePassword; 
	}

	$scope.$on('ShowUserDetails', function(e){
		$scope.UserForm.$setPristine();
	});

	$scope.UpdateUserPassword = function () {
		if($scope.UserDetails.NewPassword1 !== $scope.UserDetails.NewPassword2) {
			alert("Passwords do not match, please try again.");
		}else {
			var ObjToPass = { Email: $scope.UserDetails.Email, NewPassword: $scope.UserDetails.NewPassword1 };
			UserService.UpdateDbPassword(ObjToPass, function (retval) {
				$scope.UserDetails.NewPassword1 = "";
				$scope.UserDetails.NewPassword2 = "";
			});
		}
		$scope.NewPassword1 = "";
		$scope.NewPassword2 = "";	
		$scope.UserForm.$setPristine();
	}

	$scope.BackToUsers = function () {
		$scope.DisplayMode = 'list';
		$scope.UserDetails.ShowChangePassword = false;
	}




}]);