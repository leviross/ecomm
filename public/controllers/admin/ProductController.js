app.controller('ProductController', ['$scope', 'ProductService', function($scope, ProductService){

	$scope.Product = {};

	$scope.AddNewProduct = function(){
		ProductService.AddNewProduct($scope.Product, function(retval){
			$scope.Product = retval;
		});
	}


}]);