var Product = require('../models/product');
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

exports.CreateNewProduct = function(req, res) {

	var publicIds = [];
	//return console.log(req.body.Images.length);

	for(var i = 0; i < req.body.Images.length; i++) {
		cloudinary.v2.uploader.upload(req.body.Images[i], function(error, result) {
			if(error){
				console.log("Error uploading to cloudinary:\n", error);
			}else{
				publicIds.push(result.public_id);
				return console.log(publicIds);
				if(i == req.body.Images.length-1) {
					var p = new Product();
					p.Title = req.body.Title;
					p.Category = req.body.Category;
					p.Price = req.body.Price;
					p.Images = publicIds;

					p.save(function(err, product) {
						if(err) console.log("Error saving the new product:\n", err);
						console.log(product);
						res.json(product);
					});
				}
			}
		});
	}

}



function UploadImages(imgArr) {
	var publicIds = [];
	imgArr.forEach(function(img) {
		cloudinary.v2.uploader.upload(img, function(error, result) {
			if(error){
				console.log("Error uploading to cloudinary:\n", error);
			}else{
				console.log("Successfully uploaded to cloudinary:\n", result);
				publicIds.push(result);
			}
			
		});
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






