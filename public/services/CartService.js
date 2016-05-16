function CartService() {

	var cart = [];

	var ServiceObject = {
		AddToCart: function(product, quantity, selPrice) {
			cart.push({Product:product, Quantity: quantity, SelectedPrice: selPrice, Discount: discount});
			localStorage.setItem("Cart", JSON.stringify(cart));
		},
		GetCart: function(cb) {
			if(cart && cart.length !== 0) {
				cb(cart);
			}else if(!localStorage.Cart) {
				cb(null);
			}else if(localStorage.Cart) {
				var parsedCart = JSON.parse(localStorage.getItem("Cart"));
				cart = parsedCart;
				cb(cart);
			}
		},
		UpdateCart: function(value, index) {
			if(value == null) {
				cart.splice(index, 1);
			}else {
				cart[index] = value;
			}
			
			localStorage.setItem("Cart", JSON.stringify(cart));
		}
	}

	return ServiceObject;

}

app.factory("CartService", CartService);