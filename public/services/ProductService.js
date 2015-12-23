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
			var self = this;	
			return $http.get('http://localhost:4000/api/categories')
				.then(function(result){
					cb(result.data);
					self.InitCachedCategories("Categories", result.data);
				}, function(err){
					console.log(err);
				});
		},
		InitCachedCategories: function(key, value){
			categories = value;
			sessionStorage.setItem('Categories', JSON.stringify(value));
		},
		AddCachedCategories: function(category){
			categories.push(category);
			sessionStorage.setItem('Categories', JSON.stringify(categories));
		},
		UpdatedCachedCategories: function(key, value, index){
			categories[index] = value;
			sessionStorage.setItem(key, JSON.stringify(categories));
		},
		GetCachedCategories: function(key){
			if(categories.length !== 0){
				return categories;
			}else if(!sessionCategories){
				return null;
			}else if(sessionCategories){
				var parsedCategories = JSON.parse(sessionStorage.getItem(key));
				categories = parsedCategories;
				return categories;
			}
		},
		CreateNewCategory: function(category, cb){
			var self = this;
			return $http.post('http://localhost:4000/api/categories', category)
				.then(function(result){
					self.AddCachedCategories("Categories", result.data);
					cb(result);
				}, function(err){
					console.log(err);
				});
		},
		UpdateCategory: function(category, index, cb){
			var self = this;
			return $http.put('http://localhost:4000/api/categories/' + category._id, category)
				.then(function(result){
					self.UpdatedCachedCategories("Categories", result.data, index);
					cb(result.data);
				}, function(err){
					console.log(err);
				});
		}

	}



}]);