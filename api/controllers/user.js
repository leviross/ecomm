var User = require('../models/user');
var Bcrypt = require('bcrypt');

exports.CreateNewUser = function(req, res){
	//return console.log(req.body);

	var Hash = Bcrypt.hashSync(req.body.Password, 10);

	User.findOne(req.body.Email, function(err, existingUser){
		if(err) console.log("Error querying User collection on Create.");
		if(existingUser){
			res.send(existingUser);
		}else{
			var u = new User();
			u.FirstName = req.body.FirstName;
			u.LastName = req.body.LastName;
			u.Email = req.body.Email;
			u.Password = Hash;

			u.save(function(err, user){
				if(err) console.log("Error Creating New User.");
				res.send(user);
			});

		}
	});
}

exports.GetAllUsers = function(req, res){
	console.log("REQ\n", req);
	res.send("Hello World!");
}
