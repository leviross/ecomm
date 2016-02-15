function ProductService($http, $location, UserService){

	'use strict'
	var categories = [];

	function ForceLogin(){
		alertify.notify("Login timed out, login again.", "error", 5);
		UserService.Logout();
		$location.path('/login');
	}

	var ServiceObject = {
		AddNewProduct: function(product, cb){
			var token = sessionStorage.getItem('Token');//deal with this later, sending the token...
			return $http.post('http://localhost:4000/api/products', product)
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
			if(categories && categories.length !== 0){
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
			var token = sessionStorage.getItem('Token');
			return $http.post('http://localhost:4000/api/categories/' + token, category)
				.then(function(result){
					if(result.data.Error){
						ForceLogin();
					}else{
						self.AddCachedCategories(result.data); 
						cb(result.data);
					}
				}, function(err){
					console.log(err);
					ForceLogin();
				});
		},
		UpdateCategory: function(category, index, cb){
			var self = this;
			var token = sessionStorage.getItem('Token');
			return $http.put('http://localhost:4000/api/categories/' + category._id + '/' + token, category)
				.then(function(result){
					if(result.data.Error){
						ForceLogin();
					}else{
						self.UpdatedCachedCategories("Categories", result.data, index);
						cb(result.data);
					}
				}, function(err){
					console.log(err);
					ForceLogin();
				});
		},
		DeleteCategory: function(id, cb){
			var token = sessionStorage.getItem('Token');
			return $http.delete('http://localhost:4000/api/categories/' + id + '/' + token)
				.then(function(result){
					if(result.data.Error){
						ForceLogin();
					}else{
						cb(result.data);
					}
				}, function(err){
					console.log(err);
					ForceLogin();
				});
		}

	}

	return ServiceObject;

};


ProductService.$inject = ['$http', '$location', 'UserService'];

app.factory('ProductService', ProductService);





