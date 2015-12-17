var User = require('../models/user');
var Bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var tokenSecret = process.env.TOKEN_SECRET;
var sendgrid  = require('sendgrid')(process.env.SENDGRID_API_KEY);
var sendgrid_to_email = process.env.SENDGRID_TO_EMAIL;
var sendgrid_from_email = process.env.SENDGRID_FROM_EMAIL;

exports.CreateNewUser = function(req, res){
	
	
	User.findOne({Email: req.body.Email}, function(err, existingUser){
		if(err) console.log("Error querying User collection on Create.");
		if(existingUser){
			console.log("User already exists:\n", existingUser);
			res.send({Created: false, User: existingUser});
		}else{
			var u = new User();
			u.FirstName = req.body.FirstName;
			u.LastName = req.body.LastName;
			u.Email = req.body.Email;
			u.Password = Hash(req.body.Password);
			if(req.body.IsAdmin == '1'){
				u.IsAdmin = true;
			}else{
				u.IsAdmin = false;
			}
			if(req.body.IsEmployee){
				u.IsEmployee = req.body.IsEmployee;
			}else{
				u.IsEmployee = false;
			}
			u.save(function(err, user){
				if(err) console.log("Error Creating New User.");
				console.log("New User Created:\n", user);
				res.json({Created: true, User: user});
			});

		}
	});
}

function Hash(pass){
	return Bcrypt.hashSync(pass, 10); 
}

function isValidPassword(user, password){
	return Bcrypt.compareSync(password, user.Password);
}

exports.ChangeUserPassword = function(req, res){
	jwt.verify(req.body.Token, tokenSecret, function(jwtErr, decoded){
		if(jwtErr){ console.log("Token Expired.", jwtErr); }
		User.findOne({_id: req.params.id}, function(err, user){
			if(err) console.log("Can't find that Id, try again.");

			var passwordsMatch = isValidPassword(user, req.body.Password);

			if(passwordsMatch){ 
				console.log("That's the same password already in use.");
				res.send({PasswordUpdated: false, User: user}); 
			}else if(!passwordsMatch){

				user.Password = Hash(req.body.Password);

				user.save(function(error, updatedUser){
					if(error) console.log("Error on updating user password.");
					console.log("Password changed!\n", updatedUser);
					res.json({PasswordUpdated: true, User: 	updatedUser});
				});
			}
			
		});
	});
}

exports.ResetPassword = function(req, res){
	
    User.findOne({Email: req.params.email}, function(err, user){
    	if(err) { console.log(err) }

    	var token = jwt.sign({UserId: user._id}, tokenSecret, {expiresIn: 6000}); // 100 mins expressed in secs

	    var payload = {
	        to: sendgrid_to_email,
	        subject: 'New Email from Hipster.com',
	        from: sendgrid_from_email,
	        name: user.FirstName,
	        html: "<h4>Hello " + user.FirstName + "</h4> <br /> <p>Click <a href='http://localhost:3030/#/reset-password?token=" + token + "&id=" + user._id + "'>here</a> to reset your password.</p>"
	    }

    	sendgrid.send(payload, function(error, result){
	        if(error){
	            console.log(error);
	            res.json(error);
	        }else{
	            console.log(result);
	            
				res.json({Reset: true, Token: token, User: user});
	        }

	    });
    });
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
		}else{
			var token = jwt.sign({UserId: user._id}, tokenSecret, {expiresIn: 604800}); // expires in 1 week expressed in seconds
			res.json({Login: true, Token: token, User: user});
			console.log("Successfully logged in.");
		}
	});
}


exports.GetUserOrders = function(req, res, next){

}

exports.GetAllUsers = function(req, res){
	User.find({}, function(err, users){
		if(err) console.log("Error Getting All Users:\n", err);
		console.log("All Users:\n", users);
		res.json(users);
	});
}


exports.DeleteUser = function(req, res){
	var userId = req.body._id || req.params.id;
	User.findByIdAndRemove(userId, function(err){
		if(err) console.log("Error Deleting User:\n", err);
		res.json({UserDeleted: true, Message: "User was deleted"});
	});
}
