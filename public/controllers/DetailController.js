function DetailController(ProductService, $routeParams, SettingsService) {

	var self = this;

	this.Product = ProductService.GetProductDetail();
	//this.Product.SelectedPrice = 
	this.Sizes = SettingsService.GetSizes();
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

	this.SelectFeatured = function() {
		ProductService.SetProductDetail(this.Featured);
	}

}

DetailController.$inject = ['ProductService', '$routeParams', 'SettingsService'];

app.controller('DetailController', DetailController);