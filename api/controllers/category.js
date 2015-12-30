var Category = require('../models/category');
var jwt = require('jsonwebtoken');
var tokenSecret = process.env.TOKEN_SECRET;

exports.CreateNewCategory = function(req, res){
	jwt.verify(req.params.token, tokenSecret, function(jwtErr, decoded){
		if(jwtErr){ 
			console.log("Token Missing or Expired.", jwtErr); 
			res.json({Error: jwtErr});
		}else if(decoded){
			Category.findOne({Name: req.body.Name}, function(err, category){
				if(err) console.log("Error Finding Some Category:\n", err);
				if(category){
					console.log("That category already exists in the system.\n", category);
					res.json({Created: false, Message: "That category already exists in the system."});
				}else{
					var c = new Category();

					c.Name = req.body.Name;
					c.Types = req.body.Types;
					c.Count = req.body.Count;

					c.save(function(error, savedCategory){
						if(error) console.log("Error Saving New Category:\n", error);
						console.log(savedCategory);
						res.json(savedCategory);
					});
				}
			});
		}
	});
}

exports.GetAllCategories = function(req, res){
	Category.find({}, function(err, categories){
		if(err){
			console.log("Error Finding Categories:\n", err);
			res.json({Error: true, Message: err});
		}else{ 
			console.log(categories);
			res.json(categories);
		}
	});
}

exports.GetCategoryById  = function(req, res){
	Category.findOne({_id: req.params.id}, function(err, category){
		if(err){
			console.log("Error finding that Category:\n", err);
		}else{
			res.json(category);
		}
	});
}

exports.UpdateCategory = function(req, res){
	//deal with req.params.token and token verification
	Category.findOne({_id: req.params.id}, function(err, category){
		if(err){
			console.log("Error finding that Category:\n", err);
		}else{
			category.Name = req.body.Name;
			category.Types = req.body.Types;
			category.Count = req.body.Count;

			category.save(function(error, updatedCategory){
				if(error){
					console.log("Error Updating this Category:\n", error);
				}else{
					console.log("Updated Category:\n", updatedCategory);
					res.json(updatedCategory);
				}
			});
		}
	});
}

exports.DeleteCategory = function(req, res){
	jwt.verify(req.params.token, tokenSecret, function(jwtErr, decoded){
		if(jwtErr){ 
			console.log("Token Missing or Expired.", jwtErr); 
			res.json({Error: jwtErr});
		}else if(decoded){
			Category.findByIdAndRemove(req.params.id, function(err, category){
				if(err){
					console.log("Error Deleting Category:\n", err);
					res.json({Deleted: false, Message: err});
				}else{
					console.log("Category was deleted.");
					res.json({Deleted: true, Message: "Category was deleted."});	
				}
			});
		}
	});
}






