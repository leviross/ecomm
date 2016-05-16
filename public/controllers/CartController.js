function CartController(CartService) {

	var self = this;

	this.Count = 0;
	this.Products = [];

	CartService.GetCart(function (products) {
		self.Products = products;
		self.Count = products.length;
	});

	this.GoToProductPage = function(product) {
		ProductService.SetProductDetail(product);

		function withDashes(title) {
			return title.replace(/\s+/g, "-");		
		}
		var titleWithDashes = withDashes(product.Title);
		$location.path("/shop/" + titleWithDashes.toLowerCase());
	}

	this.Delete = function(index) {
		this.Products.splice(index, 1);
		CartService.UpdateCart(null, index);
	}
	


};

CartController.$inject = ['CartService'];

app.controller("CartController", CartController);

