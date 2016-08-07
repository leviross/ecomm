	function CartController(CartService, ProductService, $location, $rootScope) {

	'use strict'

	var self = this;
	self.Count = 0;
	self.Items = [];
	self.ItemsCopy = [];

	self.SubTotal = 0;
	self.Shipping = 0;
	self.Tax = 0.096;
	self.TaxTotal = 0;
	self.GrandTotal = 0;
	self.ChangedQuant = 0;
	self.ChangedIndex = -1;
	self.CheckOutClicked = false;
	

	// On page load, get the cart array from cart service and set count
	GetServCart();

	function GetServCart() {

		CartService.GetCart(function(servCart) {

			if (servCart == null) {
				self.Items = [];
			} else {
				self.Items = angular.copy(servCart);
				self.ItemsCopy = angular.copy(servCart);
				CalculateTotals();
			}

		});
	}


	self.GoToProductPage = function(item) {
		ProductService.SetProductDetail(item.Product);

		var titleWithDashes = withDashes(item.Product.Title);
		$location.path("/shop/" + titleWithDashes.toLowerCase());
	}

	self.Delete = function(index) {
		CartService.UpdateCart(null, index, function(servCart) {
			self.Items = angular.copy(servCart);
			CalculateTotals();
		});
	}

	function CalculateTotals() {

		$rootScope.$broadcast("UpdateCart");

		self.Count = CartService.Count();
		self.SubTotal = CartService.SubTotal();
		self.TaxTotal = CartService.TaxTotal();
		self.GrandTotal = CartService.GrandTotal();

	}

	self.UpdateCart = function() {
		// go through self.Items and see if any quantity of any product doesn't match its service 
		// counterpart in quantity. If there is a diff, then make adjustments...
		var counter = 0;

		if (self.Items.length == 0) {
			return alert("Your cart is empty!");
		} 
		

		for (var i = 0; i < self.Items.length; i ++) {
			if (self.Items[i].Quantity < 1) {
				GetServCart();
				return alert("You can not enter in less than 1.");
			} else if (self.Items[i].Quantity != self.ItemsCopy[i].Quantity) {
				self.Items[i].Total = self.Items[i].Quantity * self.Items[i].Product.SelectedPrice - self.Items[i].Discount;
				CartService.UpdateCart(self.Items, i, function(cart) {
					//self.serviceCart = cart;
					counter++;
					self.ItemsCopy = angular.copy(cart);
					CalculateTotals();
				});
			} 
		}

		if (counter == 0) alert("You didn't update anything!");
		
	}

	self.CheckOut = function() {
		if (self.Count == 0) {
			self.CheckOutClicked = true;
		} else if (self.Count > 0) {
			$location.path("checkout");
		}
	}


	function withDashes(title) {
		return title.replace(/\s+/g, "-");		
	}


	

};

CartController.$inject = ['CartService', 'ProductService', '$location', '$rootScope'];

app.controller("CartController", CartController);

