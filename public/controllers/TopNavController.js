angular.module('EcommApp')
.controller('TopNavController', ['$scope', '$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http){

	var sessionToken = sessionStorage.getItem('Token');
    console.log(sessionToken);

    $scope.NewRecord = function(){
    	$http.get('http://localhost:4000/api/orders?token=' + sessionToken)
    		.then(function(data){


    		}, function(err){

    		});
    } 


}]);