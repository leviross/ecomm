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
					self.SetCachedCategories("Categories", result.data);
				}, function(err){
					console.log(err);
				});
		},
		SetCachedCategories: function(key, value){
			categories = value;
			sessionStorage.setItem(key, JSON.stringify(value));
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
			}else if(!sessionStorage.Categories){
				return null;
			}else if(sessionStorage.Categories){
				var parsedCategories = JSON.parse(sessionStorage.getItem(key));
				categories = parsedCategories;
				return categories;
			}
		},
		CreateNewCategory: function(category, cb){
			var self = this;
			return $http.post('http://localhost:4000/api/categories', category)
				.then(function(result){
					self.AddCachedCategories(result.data); //I was calling it here, but now I am taking the ctrl's array and saving back to the virual array on the service as categories was losing its definition
					cb(result.data);
					//console.log(categories);
				}, function(err){
					console.log(err);
				});
		},
		UpdateCategory: function(category, index, cb){
			var self = this;
			return $http.put('http://localhost:4000/api/categories/' + category._id, category)
				.then(function(result){
					self.UpdatedCachedCategories("Categories", result.data, index);// read comment on lines 52 & 30
					cb(result.data);
				}, function(err){
					console.log(err);
				});
		},
		DeleteCategory: function(id, cb){
			return $http.delete('http://localhost:4000/api/categories/' + id)
				.then(function(result){
					cb(result.data);
				}, function(err){
					console.log(err);
				});
		}

	}



}]);