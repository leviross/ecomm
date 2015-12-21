app.controller('LoginController', ['$scope', '$http', '$rootScope', 'UserService', '$location', function($scope, $http, $rootScope, UserService, $location){

	
	$scope.ShowResetPass = false;

	function ClearForm(){
		$scope.LoginForm.$setPristine();
    	$scope.Email = "";
    	$scope.Password = "";
	}


	$scope.Login = function(){

		if($scope.ShowResetPass){ return $scope.ResetPassword(); }

        var LoginData = {Email: $scope.Email, Password: $scope.Password};
        var url = 'http://' + location.host;

        $http.post('http://localhost:4000/api/login', LoginData)
        .then(function(retval){

        	if(retval.data.Login){
        		alertify.notify('Login Successfull!', 'success', 5, function(){});	
        		UserService.PutLoggedInUser(retval.data.User, retval.data.Token);

            	$rootScope.$broadcast('UserLoggedIn', retval.data.User);
            	$location.path('/');
        	}else{
        		alertify.notify('Incorrect Credentials, try again', 'error', 5, function(){});
        		ClearForm();
    			$('#Email').focus();
        	}

        }, function(err){
            console.log(err);
            alertify.notify('Connection error, try again', 'error', 5, function(){});	
        });
        
    }

    $scope.Cancel = function(){ 
    	if($scope.ShowResetPass){
    		$scope.ShowResetPass = false;
    	}else{
    		$location.path('/');
    	}
    }

    $scope.ShowResetPassword = function(){
    	$scope.ShowResetPass = true;
    }

    $scope.ResetPassword = function(){
    	UserService.ResetPassword($scope.Email, function(result){
    		alertify.notify('Check your email for your password reset link', 'warning', 5, function(){});	
    		$scope.ShowResetPass = false;
    		ClearForm();
    	});
    }



}]);