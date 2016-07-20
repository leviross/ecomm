function CartController(CartService, ProductService, $location, $rootScope) {

	'use strict'

	var self = this;
	self.Count = 0;
	self.Items = [];
	self.serviceCopy = {Cart: []}

	self.SubTotal = 0;
	self.Shipping = 0;
	self.Tax = 0.096;
	self.TaxTotal = 0;
	self.GrandTotal = 0;
	self.ChangedQuant = 0;
	self.ChangedIndex = -1;
	self.CheckOutClicked = false;
	

	// On page load, get the cart array from cart service and set count
	CartService.GetCart(function(items) {

		if (items == null) {
			self.Items = [];
		} else {
			self.Items = items;
			self.serviceCopy.Cart = items;
			CalculateTotals();
		}

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
		var parsedCart = JSON.parse(localStorage.getItem("Cart"));

		for (var i = 0; i < self.Items.length; i ++) {

			if (self.Items[i].Quantity != parsedCart[i].Quantity) {
				counter++;
				CalculateTotals();
				// CartService.UpdateCart(self.Items[i], i, function(cart) {
				// 	//self.serviceCart = cart;
				// 	counter++;
				// 	CalculateTotals();
				// });
			} 
		}
		if (counter == 0) alert("You didn't update anything!");
		
	}

	self.CheckOut = function() {
		if (self.Count == 0) {
			self.CheckOutClicked = true;
		} else {
			$location.path("checkout");
		}
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

