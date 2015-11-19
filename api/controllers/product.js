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

			p.save(function(error, savedProduct){
				if(error) console.log("Error Saving New Product:\n", error);
				res.json(savedProduct);
			});
		}
	});
}