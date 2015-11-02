var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var router = express.Router();
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

var sessionOpts = {
	saveUninitialized: true, // saved new sessions
	resave: false, // do not automatically write to the session store
	secret: 'secret',//Needs some secret string to initialize, can be empty, but this would be an .env var usually.
	cookie : { secure: false, httpOnly: true, maxAge: 2419200000 } // more config
}

app.use(session(sessionOpts));

var UniqueTokenStrategy = require('passport-unique-token').Strategy;

router.get('/', function(req, res) {
	
	res.send("I LOVE SEFIRA!!!!   PEACE TO THE WORLD:)");
});
router.post('login', authenticate, function(req, res) {
	console.log(req);
	//user authenticated and can be found in req.user
});

function authenticate() {
	passport.authenticate('token', function(err, user, info) {
		if(err) return next(err);

		if(!user) res.status(401).json({message: "Incorrect token credentials"});
	
		req.user = user;
		next();
	});
}



router.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});



app.use('/', router);

var port = process.env.PORT || 3030; 

app.listen(port);
console.log("Listening on port 3030...");



