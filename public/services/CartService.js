function CartService() {

	var cart = [];
	var subTotal = 0;
	var count = 0;
	var grandTotal = 0; 
	var waTax = 0.096;
	var shipping = 0;
	var taxTotal = 0;

	var cartCopy = [];

	function CalculateTotals(cb) {
		count = 0; 
		subTotal = 0;

		for (var i = 0; i < cart.length; i++) {
			if (cart[i].Discount != 0) {
				cart[i].Total = (cart[i].Product.SelectedPrice * cart[i].Quantity) - cart[i].Discount;
				subTotal += cart[i].Total;
				count += cart[i].Quantity;
			} else {
				cart[i].Total = cart[i].Product.SelectedPrice * cart[i].Quantity;
				subTotal += cart[i].Total;
				count += cart[i].Quantity;
			}
			
		}

		grandTotal = subTotal + shipping;
		taxTotal = grandTotal * waTax;

		if (typeof cb == 'function') {
			cb(cart);
		}

		localStorage.setItem("Cart", JSON.stringify(cart));
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

			for (var i = 0; i < cart.length; i ++) {
				if (product._id == cart[i].Product._id) {
					cart[i].Quantity += quantity;
					sameProd = true;
				}
			}
			if (sameProd == false) {
				cart.push({Product:product, Quantity: quantity, Discount: 0, Total: 0});
				
			} 			

			CalculateTotals(function(cart) {
				// localStorage.setItem("Cart", JSON.stringify(cart));
				cb(cart);
			});	

			cartCopy = cart;		

		},
		CartCopy: function() {
			return cartCopy;
		},
		GetCart: function(cb) {

			var parsedCart = JSON.parse(localStorage.getItem("Cart"));

			if (cart && cart.length !== 0) {
				
				CalculateTotals(function(cart) {
					// localStorage.setItem("Cart", JSON.stringify(cart));
					cb(cart);
				});				

			} else if (parsedCart instanceof Array && parsedCart.length != 0) {
				var parsedCart = JSON.parse(localStorage.getItem("Cart"));

				cart = parsedCart;
				

				CalculateTotals(function(cart) {
					// localStorage.setItem("Cart", JSON.stringify(cart));
					cb(cart);
				});

			} else {
				cb(null);
			}

			cartCopy = parsedCart;

		},
		UpdateCart: function(value, index, cb) {
			
			if(value == null) {
				cart.splice(index, 1);	

			}else {
				cart[index].Product = value.Product;
				// figure out how to assign these values	
				// cart.push({Product:product, Quantity: quantity, Discount: 0, Total: 0});		
			}

			CalculateTotals(function(cart) {
				cartCopy = cart;
				cb(cart);
			});

			
			
		}

	}

	return ServiceObject;

}

app.factory("CartService", CartService);