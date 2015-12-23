app.controller('ProductController', ['$scope', 'ProductService', function($scope, ProductService){

	this.Product = null;
	var self = this;

	this.AddNewProduct = function(){
		ProductService.AddNewProduct(this.Product, function(retval){
			self.Product = retval;
		});
	}


}]);