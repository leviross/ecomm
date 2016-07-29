function CheckoutController(CartService, ProductService, $location, $rootScope, ValidationService) {

	'use strict'

	var self = this;

	self.Items = [];
	self.SubTotal = 0;
	self.Shipping = 0;
	self.Tax = 0.096;
	self.TaxTotal = 0;
	self.GrandTotal = 0;

	self.CheckOutObj = {};

	Init();

	function Init() {
		CartService.GetCart(function(cart) {
			self.CheckOutObj.SubTotal = CartService.SubTotal();
			self.CheckOutObj.TaxTotal = CartService.TaxTotal();
			self.CheckOutObj.GrandTotal = CartService.GrandTotal();
			self.CheckOutObj.Count = CartService.Count();
		});
	}

	self.Capitalize = function(field) {
		if (field == undefined){ 
			return;
		} else if (field == "State" && self.CheckOutObj.State.length == 2) {
			self.CheckOutObj.State = ValidationService.CapitalizeName(self.CheckOutObj.State);
		} else {
			self.CheckOutObj[field] = ValidationService.CapitalizeName(self.CheckOutObj[field]);
		}

	}

	self.ParsePhone = function() {
		var digits = self.CheckOutObj.Phone.replace(/\D/g, "");
		
		var output = "";
		if (digits.length == 10) {
			for (var i = 0; i < digits.length; i++) {
				if (i == 3 || i == 6) {
					output += "-" + digits[i];
				} else {
					output += digits[i];
				}
			}
			self.CheckOutObj.Phone = output;
		}
	}







	



	
	

	

};

CheckoutController.$inject = ['CartService', 'ProductService', '$location', '$rootScope', 'ValidationService'];

app.controller("CheckoutController", CheckoutController);

