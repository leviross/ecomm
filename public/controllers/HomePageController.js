function HomePageController($scope, UserService, $rootScope, ProductService) {

	this.MyInterval = 5000;
	this.noWrapSlides = false;
	this.Products = [];
	
	this.Slides = [{Image: '../images/furn1.jpg', Text: "Image 1"}, {Image: '../images/furn2.jpg', Text: "Image 2"}, {Image: '../images/furn3.jpg', Text: "Image 3"}];


	var user = UserService.GetLoggedInUser();
	console.log("Current Token:\n", user);

	// https://res.cloudinary.com/dewoxdkgg/image/upload/ueq4e58qrzhmzciteqou.jpg
	this.OpenModal = function() {
		$rootScope.$broadcast('OpenQuickViewModal');
	}

	//$rootScope.$broadcast('ChooseActiveNav', 0);	

	ProductService.GetAllProducts(function(products) {
		this.Products = products;
	});



}

HomePageController.$inject = ['$scope', 'UserService', '$rootScope', 'ProductService'];

app.controller('HomePageController', HomePageController);