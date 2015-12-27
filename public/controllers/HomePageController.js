function HomePageController($scope, UserService, $rootScope){

	this.MyInterval = 5000;
	this.noWrapSlides = false;

	this.Slides = [{Image: '../images/furn1.jpg', Text: "Image 1"}, {Image: '../images/furn2.jpg', Text: "Image 2"}, {Image: '../images/furn3.jpg', Text: "Image 3"}];


	var user = UserService.GetLoggedInUser();
	console.log("Current Token:\n", user);



	this.OpenModal = function(){
		$rootScope.$broadcast('OpenQuickViewModal');
	}

	


}

HomePageController.$inject = ['$scope', 'UserService', '$rootScope'];

app.controller('HomePageController', HomePageController);