function CartService() {

	var cart = [];

	var ServiceObject = {
		AddToCart: function(product) {
			cart.push(product);
			localStorage.setItem("Cart", JSON.stringify(cart));
		},
		GetCart: function() {
			if(cart && cart.length !== 0){
				return cart;
			}else if(!localStorage.Cart){
				return null;
			}else if(localStorage.Cart){
				var parsedCart = JSON.parse(localStorage.getItem("Cart"));
				cart = parsedCart;
				return cart;
			}
		},
		UpdatedCart: function(value, index){
			cart[index] = value;
			localStorage.setItem("Cart", JSON.stringify(cart));
		}
	}

	return ServiceObject;

}

app.factory("CartService", CartService);