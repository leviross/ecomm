function DetailController(ProductService, $routeParams) {

	var self = this;

	this.Product = ProductService.GetProductDetail();
	this.SimilarProducts = [];

	var cachedProducts = ProductService.GetCachedProducts("Products");
	if(!cachedProducts) {
		ProductService.GetAllProducts(function(products) {
			SimilarProducts(products);
		});
	}else {
		SimilarProducts(cachedProducts);
	}	

	function SimilarProducts(products) {
		for(var i = 0; i < products.length; i++) {
			if(products[i].Category == self.Product.Category && products[i].Title != self.Product.Title) {
				self.SimilarProducts.push(products[i]);
			}
		}
	}	

}

DetailController.$inject = ['ProductService', '$routeParams'];

app.controller('DetailController', DetailController);