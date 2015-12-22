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
			c.Types = types;
			
			c.save(function(error, savedCategory){
				if(error) console.log("Error Saving New Category:\n", error);
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

exports.DeleteCategory = function(req, res){
	Category.findByIdAndRemove(req.params.id, function(err, Category){
		if(err) console.log("Error Deleting Category:\n", err);
		res.json(product);
	});
}






