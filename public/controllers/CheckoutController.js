function CheckoutController(CartService, ProductService, $location, $rootScope, ValidationService) {

	'use strict'

	var self = this;
	
	self.CheckOutObj = {};

	self.Items = [];
	self.CheckOutObj.SubTotal = 0;
	self.CheckOutObj.Shipping = 0;
	self.CheckOutObj.Tax = 0.096;
	self.CheckOutObj.TaxTotal = 0;
	self.CheckOutObj.GrandTotal = 0;


	Init();

	function Init() {
		CartService.GetCart(function(servCart) {
			self.CheckOutObj.SubTotal = CartService.SubTotal();
			self.CheckOutObj.TaxTotal = CartService.TaxTotal();
			self.CheckOutObj.GrandTotal = CartService.GrandTotal();
			self.CheckOutObj.Count = CartService.Count();
			self.CheckOutObj.Shipping = CartService.Shipping();
		});
	}

	self.Capitalize = function(field) {
		if (field == undefined){ 
			return;
		} else if (field == "State" && self.CheckOutObj.State.length == 2) {
			self.CheckOutObj.State = ValidationService.Capitalize(self.CheckOutObj.State);
		} else {
			self.CheckOutObj[field] = ValidationService.Capitalize(self.CheckOutObj[field]);
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

