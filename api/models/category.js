var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CategoryModel = new mongoose.Schema({
	Name: String,
	Types: String,
	Count: Number
}, { collection: 'category' } );

module.exports = mongoose.model('Category', CategoryModel);