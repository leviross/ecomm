app.controller('LoginController', ['$scope', '$http', '$rootScope', 'UserService', '$location', function($scope, $http, $rootScope, UserService, $location){

	$scope.Login = function(){

        var LoginData = {Email: $scope.Email, Password: $scope.Password};
        var url = 'http://' + location.host;

        $http.post('http://localhost:4000/api/login', LoginData)
        .then(function(retval){

        	if(retval.data.Login){
        		alertify.notify('Login Successfull!', 'success', 5, function(){});	
        		sessionStorage.setItem('Token', retval.data.Token);
            	sessionStorage.setItem('User', JSON.stringify(retval.data.User));
            	$rootScope.$broadcast('UserLoggedIn', retval.data.User);
        	}else{
        		alertify.notify('Incorrect Credentials, try again', 'error', 5, function(){});
        		$scope.LoginForm.$setPristine();
    			$scope.Email = "";
    			$scope.Password = "";
    			$('#Email').focus();
        	}
            
            
            // var sessionUser = JSON.parse(sessionStorage.getItem('User'));
            // console.log(sessionUser);
            // var sessionToken = sessionStorage.getItem('Token');
            // UserService.PutLoggedInUser(retval.data.User);

        }, function(err){
            console.log(err);
            alertify.notify('Connection error, try again', 'error', 5, function(){});	
        });
        
    }

    $scope.Cancel = function(e){
    	$location.path('/');
    }           

}]);