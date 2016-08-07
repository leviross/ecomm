function CartService() {

	var servCart = [];
	var subTotal = 0;
	var count = 0;
	var grandTotal = 0; 
	const waTax = 0.096;
	var shipping = 0;
	var taxTotal = 0;


	function CalculateTotals(cb) {
		count = 0; 
		subTotal = 0;

		for (var i = 0; i < servCart.length; i++) {
			if (servCart[i].Discount != 0) {
				servCart[i].Total = (servCart[i].Product.SelectedPrice * servCart[i].Quantity) - servCart[i].Discount;
				subTotal += servCart[i].Total;
				count += servCart[i].Quantity;
			} else {
				servCart[i].Total = servCart[i].Product.SelectedPrice * servCart[i].Quantity;
				subTotal += servCart[i].Total;
				count += servCart[i].Quantity;
			}
			
		}

		grandTotal = subTotal + shipping;
		taxTotal = grandTotal * waTax;

		if (typeof cb == 'function') { cb(servCart); }
		localStorage.setItem("Cart", JSON.stringify(servCart));
	}


	var ServiceObject = {

		SubTotal: function() { 
			return subTotal;
		},
		Count: function() { 
			return count; 
		},
		TaxTotal: function() { 
			return taxTotal; 
		},
		GrandTotal: function() { 
			return grandTotal; 
		},

		AddToCart: function(product, quantity, cb) {

			var sameProd = false;

			for (var i = 0; i < servCart.length; i ++) {
				if (product._id == servCart[i].Product._id) {
					servCart[i].Quantity += quantity;
					sameProd = true;
				}
			}
			if (sameProd == false) {
				servCart.push({Product:product, Quantity: quantity, Discount: 0, Total: 0});
			} 			

			CalculateTotals(function(servCart) {
				if (typeof cb == 'function') { cb(servCart); }
			});	
				

		},

		GetCart: function(cb) {

			if (servCart && servCart.length !== 0) {
				
				CalculateTotals(function(servCart) {
					if (typeof cb == 'function') { cb(servCart); }
				});				

			} else if (servCart.length == 0 && localStorage.getItem("Cart")) {
				var parsedservCart = JSON.parse(localStorage.getItem("Cart"));

				servCart = parsedservCart;				

				CalculateTotals(function(servCart) {
					if (typeof cb == 'function') { cb(servCart); }
				});

			} else {
				if (typeof cb == 'function') { cb(null); }
			}
			

		},
		UpdateCart: function(ctrlCart, index, cb) {
			
			if(ctrlCart == null) {
				servCart.splice(index, 1);	

			}else if (ctrlCart instanceof Array) {
				servCart = angular.copy(ctrlCart);		
			}

			CalculateTotals(function(servCart) {
				if (typeof cb == 'function') { cb(servCart); }
			});
			
			
		}

	}

	return ServiceObject;

}

app.factory("CartService", CartService);