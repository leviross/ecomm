function CartController(CartService, ProductService, $location, $rootScope) {

	var self = this;

	this.Count = 0;
	this.Products = [];
	this.SubTotal = 0;
	this.Shipping = 0;
	this.Tax = 0.096;
	self.TaxTotal = 0;
	this.GrandTotal = 0;
	this.ChangedQuant = 0;
	this.ChangedIndex = -1;

	// On page load, get the cart array from cart service and set count
	CartService.GetCart(function (products) {
		self.Products = products;
		self.Count = products.length;
		CalculateTotals();
		console.log(self.Products);
	});

	this.GoToProductPage = function(item) {
		ProductService.SetProductDetail(item.Product);

		var titleWithDashes = withDashes(item.Product.Title);
		$location.path("/shop/" + titleWithDashes.toLowerCase());
	}

	this.Delete = function(index) {
		CartService.UpdateCart(null, index, function(cart) {
			self.Products = cart;
			self.Count = self.Products.length;
			$rootScope.$broadcast("UpdateCart");
			CalculateTotals();
		});
		console.log("CartController Cart Total: ", self.Products.length);
	}

	function CalculateTotals() {

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
	}

	this.UpdateCart = function() {
		// go through self.Products and see if any quantity of any product doesn't match its service 
		// counterpart in quantity. If there is a diff, then make adjustments...

		for (var i = 0; i < self.Products.length; i++) {
			if (i == this.ChangedIndex && self.Products[i].Quantity != self.ChangedQuant) {
				self.Products[i].Quantity = self.ChangedQuant;
				CalculateTotals();
				CartService.UpdateCart(self.Products[i], i, function(cart) {});
			}
		}
	}

	this.UpdateQuantity = function(index) {
		this.ChangedIndex = index;
	}

	function withDashes(title) {
		return title.replace(/\s+/g, "-");		
	}


	


};

CartController.$inject = ['CartService', 'ProductService', '$location', '$rootScope'];

app.controller("CartController", CartController);

