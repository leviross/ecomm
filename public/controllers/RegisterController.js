app.controller('RegisterController', ['$scope', 'ValidationService', '$http', '$location', function($scope, ValidationService, $http, $location){

	$scope.CheckFirstName = function(){
		if($scope.FirstName !== ""){
        	$scope.FirstName = ValidationService.CapitalizeName($scope.FirstName);
		}
    }

    $scope.CheckLastName = function(){
    	if($scope.LastName !== ""){
        	$scope.LastName = ValidationService.CapitalizeName($scope.LastName);
    	}
    }

    $scope.Register = function(){
        var SignUpData = {Email: $scope.Email, FirstName: $scope.FirstName, LastName: $scope.LastName, Password: $scope.Password};

        $http.post('http://localhost:4000/api/users', SignUpData)
            .then(function(retval){
                if(retval.data.Created){
	        		alertify.notify('Welcome to HipsterLand! Please login.', 'success', 5, function(){});
	        		$scope.RegistrationForm.$setPristine();
	    			$location.path('/login');
	        	}else{
	        		alertify.notify('That email already exists, try again.', 'error', 5, function(){});	
	        		$scope.RegistrationForm.$setPristine();
	        		$scope.FirstName = "";
	        		$scope.LastName = "";
	        		$scope.Email = "";
	        		$scope.Password = "";
	        		$scope.Password2 = "";
	        		$('#FirstName').focus();
	        	}
            
            }, function(err){
            	alertify.notify('Connection error, try again', 'error', 5, function(){});
                console.log("Error Registering\n", err);
            });

    }

}]);