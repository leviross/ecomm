var Product = require('../models/product');

exports.CreateNewProduct = function(req, res){
	Product.findOne({Sku: req.body.Sku}, function(err, product){
		if(err) console.log("Error Finding Some Product =\n", err);
		if(product){
			console.log("That sku # already exists in the system.\n", product);
			res.json({Created: false, Message: "That sku # already exists in the system."});
		}else{
			var p = new Product();

			p.Type = req.body.Type;
			p.Brand = req.body.Brand;
			p.Sku = req.body.Sku;
			p.Cost = req.body.Cost;
			p.Price = req.body.Price;
			p.Shipping = req.body.Shipping;
			p.Weight = req.body.Weight;
			p.Height = req.body.Height;
			p.Width = req.body.Width;
			p.Depth = req.body.Depth;
			p.Color = req.body.Color;
			p.Material = req.body.Material;
			p.Desc = req.body.Desc;
			p.Title = req.body.Title;

			//WE NEED TO UPLOAD THE IMAGES TO CLOUDINARY...

			p.save(function(error, savedProduct){
				if(error) console.log("Error Saving New Product:\n", error);
				res.json(savedProduct);
			});
		}
	});
}

exports.GetProductById = function(req, res){
	var productId = req.body._id || req.params.id;
	Product.findOne({_id: productId}, function(err, product){
		if(err) console.log("Error Finding Product:\n", err);
		res.json(product);
	});
}

exports.DeleteProduct = function(req, res){
	Product.findByIdAndRemove(req.params.id, function(err, product){
		if(err) console.log("Error Deleting Product:\n", err);
		res.json(product);
	});
}






