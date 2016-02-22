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

	ProductService.GetAllProducts(function(dbArray){
			self.Products = dbArray;
		});

	this.Categories = ProductService.GetCachedCategories("Categories");

	if(this.Categories == null || this.Categories == undefined || this.Categories == "undefined"){
		ProductService.GetAllCategories(function(dbArray){
			self.Categories = dbArray;
		});
	}

	this.EditProduct = function(product, index) {
		this.Images = [];
		this.Image1 = undefined;
		this.Image2 = undefined;
		this.Image3 = undefined;
		this.DisplayMode = 'edit';
		currentProduct = product;
		this.currentIndex = index;
		this.Title = product.Title;
		this.Description = product.Description;
		this.Size = product.Size;
		this.Price = product.Price;
		this.Category = product.Category;
		this._id = product._id;
		for (var i = 0; i < product.Images.length; i++) {
			this.Images.push({PublicId: product.Images[i]});
		}
		
	}

	this.UpdateProduct = function() {
		var images = [];
		var imageChange = false;
		for(var i = 0; i < this.Images.length; i++) {
			images.push(this.Images[i].PublicId);
		}
		if(this.Image1) images.push(this.Image1);
		if(this.Image2) images.push(this.Image2);
		if(this.Image3) images.push(this.Image3);
		for(var j = 0; j < images.length; j++) {
			if(images[j].length > 30) imageChange = true;
		} 
		var product = {_id: this._id, ImageChange: imageChange, Images: images, Title: this.Title, Description: this.Description, Size: this.Size, Price: this.Price, Category: this.Category};
		ProductService.UpdateProduct(product, this.currentIndex, function(result) {
			alertify.notify('Product Updated!', 'success', 5, function(){});
			self.DisplayMode = 'list';
		});
	}

	this.DeleteImage = function(index) {
		this.Images.splice(index, 1);
	}

	this.CreateProduct = function(){
		ProductService.AddNewProduct(this.Product, function(retval){
			self.Product = retval;
		});
	}

	this.Cancel = function() {
		this.DisplayMode = 'list';
	}




}

ProductController.$inject = ['ProductService'];

app.controller('ProductController', ProductController);