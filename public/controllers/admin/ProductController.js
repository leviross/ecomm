function ProductController(ProductService) {

	var self = this;
	var currentProduct = null;
	this.currentIndex = null;
	this.DisplayMode = 'list';

	this.Products = ProductService.GetCachedProducts("Products");

	if(this.Products == null || this.Products == undefined || this.Products == "undefined"){
		ProductService.GetAllProducts(function(dbArray){
			self.Products = dbArray;
		});
	}

	this.EditProduct = function(product, index) {
		this.DisplayMode = 'edit';
		currentProduct = product;
		this.currentIndex = index;
		this.Title = product.Title;
		this.Description = product.Description;
		this.Size = product.Size;
		this.Images = product.Images;
		this.Price = product.Price;
	}

	this.AddNewProduct = function(){
		ProductService.AddNewProduct(this.Product, function(retval){
			self.Product = retval;
		});
	}


}

ProductController.$inject = ['ProductService'];

app.controller('ProductController', ProductController);