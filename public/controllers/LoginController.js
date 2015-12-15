app.controller('LoginController', ['$scope', '$http', '$rootScope', 'UserService', function($scope, $http, $rootScope, UserService){

	$scope.Login = function(){

        var LoginData = {Email: $scope.Email, Password: $scope.Password};
        var url = 'http://' + location.host;

        $http.post('http://localhost:4000/api/login', LoginData)
        .then(function(retval){

            sessionStorage.setItem('Token', retval.data.Token);

            sessionStorage.setItem('User', JSON.stringify(retval.data.User));
            var sessionUser = JSON.parse(sessionStorage.getItem('User'));
            
            console.log(sessionUser);


            var sessionToken = sessionStorage.getItem('Token');
            UserService.PutLoggedInUser(retval.data.User);

            $rootScope.$broadcast('UserLoggedIn', retval.data.User);
        }, function(err){
            console.log(err);
        });
        
    }           

}]);