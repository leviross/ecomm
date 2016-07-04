function CartController(CartService, ProductService, $location, $rootScope) {

	'use strict'

	var self = this;
	self.Count = 0;
	self.Items = [];
	self.SubTotal = 0;
	self.Shipping = 0;
	self.Tax = 0.096;
	self.TaxTotal = 0;
	self.GrandTotal = 0;
	self.ChangedQuant = 0;
	self.ChangedIndex = -1;

	

	// On page load, get the cart array from cart service and set count
	CartService.GetCart(function (items) {
		if (items == null) {
			self.Items = [];
		} else {
			self.Items = items;
			CalculateTotals();
		}
		
		//self.Count = items.length;
		//console.log(self.Items);
	});

	self.GoToProductPage = function(item) {
		ProductService.SetProductDetail(item.Product);

		var titleWithDashes = withDashes(item.Product.Title);
		$location.path("/shop/" + titleWithDashes.toLowerCase());
	}

	self.Delete = function(index) {
		CartService.UpdateCart(null, index, function(cart) {
			self.Items = cart;
			//self.Count = self.Items.length;
			//$rootScope.$broadcast("UpdateCart");
			CalculateTotals();
		});
		console.log("CartController Cart Total: ", self.Items.length);
	}

	function CalculateTotals() {
		self.Count = 0;
		self.SubTotal = 0;
		for (var i = 0; i < self.Items.length; i++) {
			if (self.Items[i].Discount != 0) {
				self.Items[i].Total = (self.Items[i].Product.SelectedPrice * self.Items[i].Quantity) - self.Items[i].Discount;
				self.SubTotal += self.Items[i].Total;
				self.Count += self.Items[i].Quantity;
			} else {
				self.Items[i].Total = self.Items[i].Product.SelectedPrice * self.Items[i].Quantity;
				self.SubTotal += self.Items[i].Total;
				self.Count += self.Items[i].Quantity;
			}
		}

		self.GrandTotal = self.SubTotal + self.Shipping;
		self.TaxTotal = self.GrandTotal * self.Tax;
		$rootScope.$broadcast("UpdateCart");
	}

	self.UpdateCart = function() {
		// go through self.Items and see if any quantity of any product doesn't match its service 
		// counterpart in quantity. If there is a diff, then make adjustments...

		CalculateTotals();
	}

	self.UpdateQuantity = function(index) {
		self.ChangedIndex = index;
	}

	function withDashes(title) {
		return title.replace(/\s+/g, "-");		
	}


	

};

CartController.$inject = ['CartService', 'ProductService', '$location', '$rootScope'];

app.controller("CartController", CartController);

