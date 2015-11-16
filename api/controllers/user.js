var User = require('../models/user');
var Bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var tokenSecret = process.env.TOKEN_SECRET;

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
			u.Token = "";
			u.save(function(err, user){
				if(err) console.log("Error Creating New User.");
				res.send(user);
			});

		}
	});
}

var isValidPassword = function(user, password){
	//console.log(user, password);
	return Bcrypt.compareSync(password, user.Password);
}


exports.Login = function(req, res, next){
	User.findOne({Email: req.body.Email}, function(err, user){
		if(err) { console.log("Error Finding User on Login\n", err); }
		if(user == null) {
			res.json({Username: false});
			console.log("Wrong Email");
		}else if(!isValidPassword(user, req.body.Password)){
			res.json({Login: false});
			console.log("Wrong password");
		}else {
			

			var token = jwt.sign(user, tokenSecret, {expiresIn: 1}); // expires in 1 week expressed in seconds
			user.Token = "";
			user.save(function(error, tokenedUser){
				if(error) { console.log("Error Saving User Token\n", error); }
				console.log("Generated Token\n", token);
				res.json(token);
				console.log("Successfully logged in.");
			});
		}
	});
}

exports.GetUserOrders = function(req, res, next){

}

exports.GetAllUsers = function(req, res){
	console.log("REQ\n", req);
	res.send("Hello World!");
}


exports.DeleteUser = function(req, res){
	User.findById(req.body._id).remove(function(err, status){
		if(err) console.log("Error Deleting User");
		console.log("Status of Delete Is: ", status);
		res.send(status);
	});
}
