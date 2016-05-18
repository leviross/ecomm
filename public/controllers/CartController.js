function CartController(CartService, ProductService, $location, $rootScope) {

	var self = this;

	this.Count = 0;
	this.Products = [];

	CartService.GetCart(function (products) {
		self.Products = products;
		self.Count = products.length;
	});

	this.GoToProductPage = function(item) {
		ProductService.SetProductDetail(item.Product);

		var titleWithDashes = withDashes(item.Product.Title);
		$location.path("/shop/" + titleWithDashes.toLowerCase());
	}

	this.Delete = function(index) {
		this.Products.splice(index, 1);
		CartService.UpdateCart(null, index);
		console.log("CartController Cart Total: ", self.Products.length);
		$rootScope.$broadcast("UpdateCart");
	}

	function withDashes(title) {
		return title.replace(/\s+/g, "-");		
	}
	


};

CartController.$inject = ['CartService', 'ProductService', '$location', '$rootScope'];

app.controller("CartController", CartController);

