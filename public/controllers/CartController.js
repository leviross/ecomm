function CartController(CartService, ProductService, $location, $rootScope) {

	var self = this;

	this.Count = 0;
	this.Products = [];
	this.SubTotal = 0;
	this.Shipping = 0;
	this.Tax = 0.096;
	self.TaxTotal = 0;
	this.GrandTotal = 0;


	CartService.GetCart(function (products) {
		self.Products = products;
		self.Count = products.length;

		for (var i = 0; i < self.Products.length; i++) {
			if (self.Products[i].Discount != 0) {
				self.Products[i].Total = (self.Products[i].SelectedPrice * self.Products[i].Quantity) - self.Products[i].Discount;
				self.SubTotal += self.Products[i].Total;
			} else {
				self.Products[i].Total = self.Products[i].SelectedPrice * self.Products[i].Quantity;
				self.SubTotal += self.Products[i].Total;
			}

		}

		self.GrandTotal = self.SubTotal + self.Shipping;
		self.TaxTotal = self.GrandTotal * self.Tax;

		console.log(self.Products);

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

