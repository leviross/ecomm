app.controller('CategoryController', function($scope, ProductService){

	this.currentIndex = null;
	this.DisplayMode = 'list';
	this.CategoryDetails = null;

	var self = this;

	this.Categories = ProductService.GetCachedCategories("Categories");
	console.log(this);

	if(!this.Categories){
		ProductService.GetAllCategories(function(result) {
			self.Categories = result;
		});
	}

	this.AddCategory = function(){
		this.DisplayMode = 'create';
		this.CategoryDetails = null;
	}

	this.EditCategory = function(category, index){
		this.DisplayMode = 'edit';
		this.CategoryDetails = category;
		this.currentIndex = index;
	}

	this.CreateNewCategory = function(){
		ProductService.CreateNewCategory(this.CategoryDetails, function(result){
			self.Category = result;
			self.Categories.push(result);
			self.DisplayMode = 'list';
		});
	}

	this.UpdateCategory = function(){
		ProductService.UpdateCategory(this.CategoryDetails, this.currentIndex, function(result){
			alertify.notify('Category Updated.', 'success', 5, function(){});
			self.Categories[self.currentIndex] = result;
			self.DisplayMode = 'list';
			ClearForm();
		});
	}

	this.GetAllCategories = function(){
		ProductService.GetAllCategories(function(result){
			self.Categories = result;
		});
	}

	this.BackToCategories = function() {
		var categoriesArray = ProductService.GetCachedCategories("Categories");
		//console.log(categoriesArray);
		//self.Categories = categoriesArray;
		this.DisplayMode = 'list';
		//ClearForm();
	}

	function ClearForm(){
		self.CategoryForm.$setPristine();
		self.CategoryDetails.Name = "";
		self.CategoryDetails.Types = "";
	}

});