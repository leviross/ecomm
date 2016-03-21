function HomePageController($scope, UserService, $rootScope, ProductService) {

	this.MyInterval = 5000;
	this.noWrapSlides = false;
	this.Products = [];
	this.Featured = null;
	var self = this;
	this.FeaturedImage = "";
	
	this.Slides = [{Image: '../images/furn1.jpg', Text: "Image 1"}, {Image: '../images/furn2.jpg', Text: "Image 2"}, {Image: '../images/furn3.jpg', Text: "Image 3"}];


	var user = UserService.GetLoggedInUser();
	console.log("Current Token:\n", user);

	// https://res.cloudinary.com/dewoxdkgg/image/upload/ueq4e58qrzhmzciteqou.jpg
	this.OpenModal = function() {
		$rootScope.$broadcast('OpenQuickViewModal');
	}

	//$rootScope.$broadcast('ChooseActiveNav', 0);	

	ProductService.GetAllProducts(function(products) {
		self.Products = products;
		for (var i = 0; i < products.length; i++) {
			if(products[i].Title == "Leaves in the Wind") {
				self.Featured = products[i];
				// self.FeaturedImage = "background-image: url('http://res.cloudinary.com/dewoxdkgg/image/upload/" + self.Featured.Images[0] + "');";
				// background-image: url({{HomePage.FeaturedImage}});
				i = products.length;
			}
		}
	});

	this.SelectFeatured = function() {
		ProductService.SetProductDetail(this.Featured);
	}

	// 'http://res.cloudinary.com/dewoxdkgg/image/upload/{{HomePage.Featured.Images[0]}}'



}

HomePageController.$inject = ['$scope', 'UserService', '$rootScope', 'ProductService'];

app.controller('HomePageController', HomePageController);