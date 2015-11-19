app.factory('ProductService', ['$http', function($http){

	return {
		AddNewProduct: function(product, cb){
			return $http.post('http://localhost:4000/api/products')
				.then(function(err){
					console.log("Error posting new product\n", err);
				}, function(retval){
					cb(retval);
				});
		}

	}



}])