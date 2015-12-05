app.controller('HomePageController', ['$scope', 'TokenService', 'UserService', function($scope, TokenService, UserService){

	$scope.MyInterval = 5000;
	$scope.noWrapSlides = false;

	$scope.Slides = [{Image: '../images/furn1.jpg', Text: "Image 1"}, {Image: '../images/furn2.jpg', Text: "Image 2"}, {Image: '../images/furn3.jpg', Text: "Image 3"}];

	var token = TokenService.GetCurrentToken();
	console.log("Current Token:\n", token);


}]);