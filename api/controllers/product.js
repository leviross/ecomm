var Product = require('../models/product');
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

exports.CreateProduct = function(req, res) {

	var publicIds = [];
	UploadImages(0);

	function UploadImages(i) {
		if(i < req.body.Images.length) {
			cloudinary.v2.uploader.upload(req.body.Images[i], function(error, result) {
				if(error){
					console.log("Error uploading to cloudinary:\n", error);
					res.send("Error uploading to cloudinary:\n" + error);
				}else{
					publicIds.push(result.public_id);
					console.log("i is: ", i);
					console.log("Public Ids Array: ", publicIds);
					UploadImages(i+1);
					if(i == req.body.Images.length-1) SaveProduct();
				}
			});	
		}
	}
	

	function SaveProduct() {
		console.log("Got to final upload and creating object model.");
		var p = new Product();
		p.Title = req.body.Title;
		p.Category = req.body.Category;
		p.SmallPrice = req.body.SmallPrice;
		p.MedPrice = req.body.MedPrice;
		p.LargePrice = req.body.LargePrice;
		p.SelectedPrice = req.body.SelectedPrice;
		p.Description = req.body.Description;
		p.DefaultSize = req.body.DefaultSize;
		p.Images = publicIds;

		p.save(function(err, product) {
			if(err) {
				console.log("Error saving the new product:\n", err);
				res.send("Error saving the new product:\n" + err);
			}else {
				console.log(product);
				res.json(product);
			}
			
		});
	}

}

exports.UpdateProduct = function(req, res) {
	Product.findOne({_id: req.params.id}, function(err, p) {
		if(err) {
			console.log("Error Finding Product:\n", err);
			res.send("That product doesn't exist in the DB:\n" + err);
		}else {
			if(!req.body.ImageChange) {
				console.log("Images were not updated.");
				p.Title = req.body.Title;
				p.Category = req.body.Category;
				p.SmallPrice = req.body.SmallPrice;
				p.MedPrice = req.body.MedPrice;
				p.LargePrice = req.body.LargePrice;
				p.SelectedPrice = req.body.SelectedPrice;
				p.Description = req.body.Description;
				p.DefaultSize = req.body.DefaultSize;
				p.Images = req.body.Images;
				p.save(function(err, product) {
					if(err) {
						console.log("Error saving the new product:\n", err);
						res.send("Error saving the new product:\n" + err);
					}else {
						console.log(product);
						res.json(product);
					}
					
				});
			}else {
				var publicIds = [];
				UploadImages(0);
				function UploadImages(i) {
					if(i < req.body.Images.length) {
						if(req.body.Images[i].length < 30) {
							publicIds.push(req.body.Images[i]);
							UploadImages(i+1);
						}else {
							cloudinary.v2.uploader.upload(req.body.Images[i], function(error, result) {
								if(error){
									console.log("Error uploading to cloudinary:\n", error);
									res.send("Error uploading to cloudinary:\n" + error);
								}else{
									publicIds.push(result.public_id);
									console.log("i is: ", i);
									console.log("Public Ids Array: ", publicIds);
									UploadImages(i+1);
									if(i == req.body.Images.length-1) SaveProduct();
								}
							});	
						}
					}
				}

				function SaveProduct() {
					console.log("Got to final upload and creating object model.");
					p.Title = req.body.Title;
					p.Category = req.body.Category;
					p.SmallPrice = req.body.SmallPrice;
					p.MedPrice = req.body.MedPrice;
					p.LargePrice = req.body.LargePrice;
					p.SelectedPrice = req.body.SelectedPrice;
					p.Description = req.body.Description;
					p.DefaultSize = req.body.DefaultSize;
					p.Images = publicIds;

					p.save(function(err, product) {
						if(err) {
							console.log("Error saving the new product:\n", err);
							res.send("Error saving the new product:\n" + err);
						}else {
							console.log(product);
							res.json(product);
						}
						
					});
				}
			}	
		}
	});
}

exports.GetAllProducts = function(req, res) {
	console.log("GOT TO CONTROLLER FN");
	Product.find({}, function(error, products) {
		if(error) {
			console.log("ERROR FINDING PRODUCTS OR SOME OTHER SERVER ERROR!!:\n", error);
			res.send("Error finding all products:\n" + error);
		}else {
			res.json(products);
		}
		
	});
}

exports.GetProductById = function(req, res){
	var productId = req.body._id || req.params.id;
	Product.findOne({_id: productId}, function(err, product){
		if(err) {
			console.log("Error Finding Product:\n", err);
			res.send("That product doesn't exist in the DB.");
		}else {
			console.log("Product retrieved: ", product);
			res.json(product);
		}
		
	});
}

exports.DeleteProduct = function(req, res){
	Product.findByIdAndRemove(req.params.id, function(err, product){
		if(err) {
			console.log("Error Deleting Product:\n", err);
			res.send("That product doesn't exist in the DB.");
		}else {
			console.log("Product was deleted.");
			res.send("Product was deleted.");
		}
		
	});
}