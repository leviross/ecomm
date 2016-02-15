var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ProductModel = new mongoose.Schema({
	Price: Number,
	Title: String,
	Category: String,
	Images: Array

}, { collection: 'product'} );

module.exports = mongoose.model('Product', ProductModel);