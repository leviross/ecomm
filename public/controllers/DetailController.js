function DetailController(ProductService, $routeParams) {

	console.log($routeParams.title);

	this.Product = ProductService.GetProductDetail();	

}

DetailController.$inject = ['ProductService', '$routeParams'];

app.controller('DetailController', DetailController);