app.controller('CategoryController', ['$scope', 'ProductService', function($scope, ProductService){

	var cachedCategories = ProductService.GetCachedCategories();
	if(cachedCategories.length == 0){
		ProductService.GetAllCategories(function(result){
			$scope.Categories = result;
		});
	}else{
		$scope.Categories = cachedCategories;
	}
	
	$scope.DisplayMode = 'list';

	$scope.AddCategory = function(){
		$scope.DisplayMode = 'create';
	}

	$scope.EditCategory = function(category){
		$scope.DisplayMode = 'edit';
		$scope.Category = category;
	}

	$scope.CreateNewCategory = function(){
		//return $scope.Category;
		ProductService.CreateNewCategory($scope.Category, function(result){
			$scope.Category = result;
			$scope.Categories.push(result);
			$scope.DisplayMode = 'list';
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

}]);