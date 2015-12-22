app.controller('CategoryController', ['$scope', 'ProductService', function($scope, ProductService){

	var currentIndex = null;

	$scope.Categories = ProductService.GetCachedCategories("Categories");

	if(!$scope.Categories){
		ProductService.GetAllCategories(function(result) {
			$scope.Categories = result;
		});
	}
	
	$scope.DisplayMode = 'list';

	$scope.AddCategory = function(){
		$scope.DisplayMode = 'create';
	}

	$scope.EditCategory = function(category, index){
		$scope.DisplayMode = 'edit';
		$scope.Category = category;
		currentIndex = index;
	}

	$scope.CreateNewCategory = function(){
		//return $scope.Category;
		ProductService.CreateNewCategory($scope.Category, function(result){
			$scope.Category = result;
			$scope.Categories.push(result);
			$scope.DisplayMode = 'list';
		});
	}

	$scope.UpdateCategory = function(){
		ProductService.UpdateCategory($scope.Category, function(result){
			alertify.notify('Category Updated.', 'success', 5, function(){});
			$scope.Categories[currentIndex] = result;
			$scope.DisplayMode = 'list';
			ClearForm();
		});
	}

	$scope.GetAllCategories = function(){
		ProductService.GetAllCategories(function(result){
			$scope.Categories = result;
		});
	}

	$scope.BackToCategories = function() {
		$scope.DisplayMode = 'list';
	}

	function ClearForm(){
		$scope.CategoryForm.$setPristine();
		$scope.Category.Name = "";
		$scope.Category.Types = "";
	}

}]);