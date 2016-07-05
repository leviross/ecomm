function CheckoutController(CartService, ProductService, $location, $rootScope) {

	'use strict'

	var self = this;
	self.Count = 0;
	self.Items = [];

	

	

};

CheckoutController.$inject = ['CartService', 'ProductService', '$location', '$rootScope'];

app.controller("CheckoutController", CheckoutController);

