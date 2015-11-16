var jwt = require('jsonwebtoken');
var User = require('../models/user');
var tokenSecret = process.env.TOKEN_SECRET;

module.exports = function(req, res, next){
	
	var token = req.body && req.body.token || req.query && req.query.token || req.headers['x-access-token'];
	
	if(token){
		jwt.verify(token, tokenSecret, function(err, decoded){
			if(err){
				console.log("Token Expired Error:\n", err);
				res.json({ success: false, message: 'Failed to authenticate token, it probably expired.' });  
			}else{
				req.decoded = decoded;
				console.log("Decoded:\n", decoded);
				next();					
			}
		});
	}else{
		res.status(403).send({success: false, message: 'No Token Provided.'});
	}

}