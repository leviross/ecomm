var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ProductModel = new mongoose.Schema({
	SmallPrice: Number,
	MedPrice: Number,
	LargePrice: Number,
	SelectedPrice: Number,
	Title: String,
	Category: String,
	Images: Array,
	Description: String,
	DefaultSize: String

}, { collection: 'product'} );

module.exports = mongoose.model('Product', ProductModel);