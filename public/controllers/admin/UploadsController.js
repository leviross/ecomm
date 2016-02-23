function UploadsController(ProductService, $location) {

	this.Categories = ProductService.GetCachedCategories("Categories");

	if(this.Categories == null || this.Categories == undefined || this.Categories == "undefined") {
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
	this.Size = "";
	this.Images = [];
	this.Description = "";


	this.UploadProduct = function() {
		//Leaves in the Wind tells a story of peace in the middle of a stormy winter. Only holding on to serenity will keep man alive! 
		this.Images = [];
		var images = [];
		this.Images.push(this.Image1, this.Image2, this.Image3);
		for(var i = 0; i < this.Images.length; i++) {
			if(this.Images[i] != "") {
				images.push(this.Images[i]);
			}
		}
		var product = {Images: images, Category: this.Category, Price: this.Price, Title: this.Title, Description: this.Description, Size: this.Size};
		ProductService.AddNewProduct(product, function(result) {
			$location.path('/admin/products');
			console.log(result);
		});
	}

	this.Cancel = function() {
		$location.path('/#/admin/products');
	}


}

UploadsController.$inject = ['ProductService', '$location'];
app.controller('UploadsController', UploadsController);