app.controller('HomePageController', ['$scope', 'UserService', '$rootScope', function($scope, UserService, $rootScope){

	$scope.MyInterval = 5000;
	$scope.noWrapSlides = false;

	$scope.Slides = [{Image: '../images/furn1.jpg', Text: "Image 1"}, {Image: '../images/furn2.jpg', Text: "Image 2"}, {Image: '../images/furn3.jpg', Text: "Image 3"}];


	var user = UserService.GetLoggedInUser();
	console.log("Current Token:\n", user.Token);



	$scope.OpenModal = function(){
		$rootScope.$broadcast('OpenQuickViewModal');
	}

	


}]);