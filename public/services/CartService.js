function CartService() {

	'use strict'

	var PrivServObj = {};

	PrivServObj.servCart = [];
	PrivServObj.subTotal = 0;
	PrivServObj.count = 0;
	PrivServObj.grandTotal = 0; 
	const waTax = 0.096;
	PrivServObj.shipping = 0;
	PrivServObj.taxTotal = 0;


	function CalculateTotals(cb) {
		PrivServObj.count = 0; 
		PrivServObj.subTotal = 0;

		for (var i = 0; i < PrivServObj.servCart.length; i++) {
			if (PrivServObj.servCart[i].Discount != 0) {
				PrivServObj.servCart[i].Total = (PrivServObj.servCart[i].Product.SelectedPrice * PrivServObj.servCart[i].Quantity) - PrivServObj.servCart[i].Discount;
				PrivServObj.subTotal += PrivServObj.servCart[i].Total;
				PrivServObj.count += PrivServObj.servCart[i].Quantity;
			} else {
				PrivServObj.servCart[i].Total = PrivServObj.servCart[i].Product.SelectedPrice * PrivServObj.servCart[i].Quantity;
				PrivServObj.subTotal += PrivServObj.servCart[i].Total;
				PrivServObj.count += PrivServObj.servCart[i].Quantity;
			}
			
		}

		PrivServObj.grandTotal = PrivServObj.subTotal + PrivServObj.shipping;
		PrivServObj.taxTotal = PrivServObj.grandTotal * waTax;

		if (typeof cb == 'function') { cb(PrivServObj.servCart); }
		localStorage.setItem("Cart", JSON.stringify(PrivServObj.servCart));
	}


	var ServiceObject = {

		SubTotal: function() { 
			return PrivServObj.subTotal;
		},
		Count: function() { 
			return PrivServObj.count; 
		},
		TaxTotal: function() { 
			return PrivServObj.taxTotal; 
		},
		GrandTotal: function() { 
			return PrivServObj.grandTotal; 
		},
		Shipping: function() {
			return PrivServObj.shipping;
		},

		AddToCart: function(product, quantity, cb) {

			var sameProd = false;

			for (var i = 0; i < PrivServObj.servCart.length; i ++) {
				if (product._id == PrivServObj.servCart[i].Product._id) {
					PrivServObj.servCart[i].Quantity += quantity;
					sameProd = true;
				}
			}
			if (sameProd == false) {
				PrivServObj.servCart.push({Product:product, Quantity: quantity, Discount: 0, Total: 0});
			} 			

			CalculateTotals(function(servCart) {
				if (typeof cb == 'function') { cb(servCart); }
			});	
				

		},

		GetCart: function(cb) {

			if (PrivServObj.servCart && PrivServObj.servCart.length !== 0) {
				
				CalculateTotals(function(servCart) {
					if (typeof cb == 'function') { cb(servCart); }
				});				

			} else if (PrivServObj.servCart.length == 0 && localStorage.getItem("Cart")) {
				var parsedservCart = JSON.parse(localStorage.getItem("Cart"));

				PrivServObj.servCart = parsedservCart;				

				CalculateTotals(function(servCart) {
					if (typeof cb == 'function') { cb(servCart); }
				});

			} else {
				if (typeof cb == 'function') { cb(null); }
			}
			

		},
		UpdateCart: function(ctrlCart, index, cb) {
			
			if(ctrlCart == null) {
				PrivServObj.servCart.splice(index, 1);	

			}else if (ctrlCart instanceof Array) {
				PrivServObj.servCart = angular.copy(ctrlCart);		
			}

			CalculateTotals(function(servCart) {
				if (typeof cb == 'function') { cb(servCart); }
			});
			
			
		}

	}

	return ServiceObject;

}

app.factory("CartService", CartService);