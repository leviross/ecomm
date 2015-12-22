app.factory('ProductService', ['$http', function($http){

	var categories = [];
	var sessionCategories = sessionStorage.getItem('Categories');

	return {
		AddNewProduct: function(product, cb){
			return $http.post('http://localhost:4000/api/products')
				.then(function(err){
					console.log("Error posting new product\n", err);
				}, function(retval){
					cb(retval);
				});
		},
		GetAllCategories: function(cb){		
			return $http.get('http://localhost:4000/api/categories')
				.then(function(result){
					cb(result.data);
					//save all categories into session storage like with users...
				}, function(err){
					console.log(err);
				});
		},
		GetCachedCategories: function(){
			return categories;
		},
		CreateNewCategory: function(category, cb){
			return $http.post('http://localhost:4000/api/categories', category)
				.then(function(result){
					cb(result);
				}, function(err){
					console.log(err);
				});
		}

	}



}])