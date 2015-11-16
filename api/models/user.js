var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserModel = new mongoose.Schema({
	FirstName: String, 
	LastName: String,
	Email: String, 
	Password: String,
	Token: Object
}, { collection: 'user'} );

UserModel.set('toJSON', {
	transform: function(doc, ret, options){
		var retJson = {
			Email: ret.Email,
			Token: ret.Token,
			FirstName: ret.FirstName,
			LastName: ret.LastName,
			_id: ret._id
		}
		return retJson;
	}
});

module.exports = mongoose.model('User', UserModel);