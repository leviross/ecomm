function CartService() {

	var cart = [];
	var subTotal = 0;
	var count = 0;
	var grandTotal = 0; 
	var waTax = 0.096;
	var shipping = 0;
	var taxTotal = 0;

	function CalculateTotals() {
		count, subTotal = 0;

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

		AddToCart: function(product, quantity) {
			
			cart.push({Product:product, Quantity: quantity, Discount: 0, Total: 0});

			

			localStorage.setItem("Cart", JSON.stringify(cart));

		},
		GetCart: function(cb) {
			if(cart && cart.length !== 0) {
				CalculateTotals();
				cb(cart);
			}else if(cart.length == 0 && !localStorage.Cart) {
				cb(null);
			}else if(localStorage.Cart) {
				var parsedCart = JSON.parse(localStorage.getItem("Cart"));
				cart = parsedCart;
				CalculateTotals();
				cb(cart);
			}
		},
		UpdateCart: function(value, index, cb) {
			if(value == null) {
				cart.splice(index, 1);
				localStorage.setItem("Cart", JSON.stringify(cart));
				cb(cart);
			}else {
				cart[index] = value;
				localStorage.setItem("Cart", JSON.stringify(cart));
				cb(cart);
			}
			console.log("CartService Cart Total: ", cart.length);
			
		}

	}

	return ServiceObject;

}

app.factory("CartService", CartService);