var Category = require('../models/category');

exports.CreateNewCategory = function(req, res){
	//return console.log(req.body);
	Category.findOne({Name: req.body.Name}, function(err, category){
		if(err) console.log("Error Finding Some Category:\n", err);
		if(category){
			console.log("That category already exists in the system.\n", category);
			res.json({Created: false, Message: "That category already exists in the system."});
		}else{
			var c = new Category();

			c.Name = req.body.Name;
			c.Types = req.body.Types;

			c.save(function(error, savedCategory){
				if(error) console.log("Error Saving New Category:\n", error);
				console.log(savedCategory);
				res.json(savedCategory);
			});
		}
	});
}

exports.GetAllCategories = function(req, res){
	Category.find({}, function(err, categories){
		if(err) console.log("Error Finding Categories:\n", err);
		console.log(categories);
		res.json(categories);
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
	Category.findOne({_id: req.params.id}, function(err, category){
		if(err){
			console.log("Error finding that Category:\n", err);
		}else{
			category.Name = req.body.Name;
			category.Types = req.body.Types;
			
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
	Category.findByIdAndRemove(req.params.id, function(err, Category){
		if(err) console.log("Error Deleting Category:\n", err);
		res.json(product);
	});
}






