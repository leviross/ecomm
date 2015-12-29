var express = require('express');
require('dotenv').load();
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var router = express.Router();
var morgan = require('morgan');

var app = express();
var jwtauth = require('./my_modules/jwtauth');
var OrderController = require('./controllers/order');
var UserController = require('./controllers/user');
var ProductController = require('./controllers/product');
var CategoryController = require('./controllers/category');

var mongoose = require('mongoose');
var uri = process.env.MONGOOSE_URI;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(morgan('dev'));


mongoose.connect(uri, function(err){
	if(err) console.log("Mongoose Connection Error\n", err);
});

// users
router.route('/users/:token')
	.post(UserController.CreateNewUser)
	.get(UserController.GetAllUsers);

router.route('/users/:id/:token')
	.put(UserController.UpdateUser)
	.delete(UserController.DeleteUser);	
		
router.route('/users/reset-password/:email')
	.put(UserController.ResetPassword);	

router.route('/login')
	.post(UserController.Login);	

//orders
router.route('/orders')
	.get(jwtauth, UserController.GetUserOrders);

// products
router.route('/categories/:token')
	.post(CategoryController.CreateNewCategory);
router.route('/categories')	
	.get(CategoryController.GetAllCategories);

router.route('/categories/:id')//add token to these routes
	.get(CategoryController.GetCategoryById)
	.put(CategoryController.UpdateCategory)
	.delete(CategoryController.DeleteCategory);	
	
router.route('/products')
	.post(ProductController.CreateNewProduct);

router.route('/products/:id')
	.get(ProductController.GetProductById)
	.delete(ProductController.DeleteProduct);

app.use('/api', router);

var port = process.env.PORT || 4000;

app.listen(port);
console.log("Listening on port 4000...");