var jwt = require('jsonwebtoken');
var User = require('../models/user');
var tokenSecret = process.env.TOKEN_SECRET;

module.exports = function(req, res, next){
	
	var token = req.body && req.body.token || req.query && req.query.token || req.headers['x-access-token'];
	
	if(token){
		var jsonVerify = jwt.verify(token, tokenSecret);
		console.log(jsonVerify);
		jwt.verify(token, tokenSecret, function(err, decoded){
			if(err){
				res.json({ success: false, message: 'Failed to authenticate token.' });  
			}else{
				if(decoded.original_iat - new Date() > 1){
					console.log("Token Expired.");
					res.send(401);
				}else{
					req.decoded = decoded;
					console.log("Decoded:\n", decoded);
					res.send("Fuck yea!!");
					next();	
				}
				
			}
		});
	}else{
		res.status(403).send({success: false, message: 'No Token Provided.'});
	}

}