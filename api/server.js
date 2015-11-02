var express = require('express');
require('dotenv').load();
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var router = express.Router();
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

var OrderController = require('./controllers/order');
var UserController = require('./controllers/user');

var mongoose = require('mongoose');
var uri = process.env.MONGOOSE_URI;
mongoose.connect(uri, function(err){
	if(err) console.log("Mongoose Connection Error\n", err);
});


router.route('/users')
	.post(UserController.CreateNewUser)
	.get(UserController.GetAllUsers);




app.use('/api', router);

var port = process.env.PORT || 4000;

app.listen(port);
console.log("Listening on port 4000...");