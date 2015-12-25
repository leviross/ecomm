app.controller('CategoryController', function($scope, ProductService){

	this.currentIndex = null;
	this.DisplayMode = 'list';
	this.CategoryDetails = null;

	var self = this;

	this.Categories = ProductService.GetCachedCategories("Categories");
	//console.log(this);

	if(!this.Categories){
		ProductService.GetAllCategories(function(result){
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
		//TODO: DB creates proper object, but it goes back to list view and lists 2 empty categories, fix. 
		ProductService.CreateNewCategory(this.CategoryDetails, function(result){
			self.CategoryDetails = result;
			self.Categories.push(result);
			self.DisplayMode = 'list';
			alertify.notify(result.Name + ' Category was created!', 'success', 5, function(){});
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

	this.DeleteCategory = function(category, index){
		ProductService.DeleteCategory(category._id, function(result){
			self.Categories.splice(index, 1);
			ProductService.InitCachedCategories('Categories', this.Categories);
			alertify.notify('Category Deleted.', 'error', 5, function(){});
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