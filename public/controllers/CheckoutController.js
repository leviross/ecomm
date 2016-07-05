function CheckoutController(CartService, ProductService, $location, $rootScope) {

	'use strict'

	
	var self = this;
	self.Items = [];
	self.SubTotal = 0;
	self.Shipping = 0;
	self.Tax = 0.096;
	self.TaxTotal = 0;
	self.GrandTotal = 0;

	Init();

	function Init() {
		CartService.GetCart(function(cart) {
			self.SubTotal = CartService.SubTotal();
			self.TaxTotal = CartService.TaxTotal();
			self.GrandTotal = CartService.GrandTotal();
		});
	}

	
	

	

};

CheckoutController.$inject = ['CartService', 'ProductService', '$location', '$rootScope'];

app.controller("CheckoutController", CheckoutController);

