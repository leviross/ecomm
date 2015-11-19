var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ProductModel = new mongoose.Schema({
	Type: String,
	Brand: String,
	Sku: String, 
	Cost: Number,
	Price: Number,
	Shipping: Number,
	Weight: String,
	Height: String,
	Width: String,
	Depth: String,
	Color: String,
	Material: String,
	Desc: String,
	Title: String

}, { collection: 'product'} );

module.exports = mongoose.model('Product', ProductModel);