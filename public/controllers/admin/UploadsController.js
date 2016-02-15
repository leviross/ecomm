function UploadsController(ProductService) {

	this.Categories = ProductService.GetCachedCategories("Categories");

	if(this.Categories == null || this.Categories == undefined || this.Categories == "undefined"){
		ProductService.GetAllCategories(function(dbArray){
			self.Categories = dbArray;
		});
	}

	this.Image1 = "";
	this.Image2 = "";
	this.Image3 = "";
	this.Title = "";
	this.Price = "";
	this.Category = "";
	this.Images = [];


	this.UploadProduct = function() {
		this.Images.push(this.Image1, this.Image2, this.Image3);
		var product = {Images: this.Images, Category: this.Category, Price: this.Price, Title: this.Title};
		ProductService.AddNewProduct(product, function(result) {
			console.log(result);
		});
	}


}

UploadsController.$inject = ['ProductService'];
app.controller('UploadsController', UploadsController);