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
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

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

// categories
router.route('/categories')
	.get(CategoryController.GetAllCategories);

router.route('/categories/:token')
	.post(CategoryController.CreateNewCategory);
	
router.route('/categories/:id/:token')
	.put(CategoryController.UpdateCategory)
	.delete(CategoryController.DeleteCategory);	

router.route('/categories/:id')
	.get(CategoryController.GetCategoryById);	
	
router.route('/products')
	.post(ProductController.CreateNewProduct);

router.route('/products/:id')
	.get(ProductController.GetProductById)
	.delete(ProductController.DeleteProduct);

app.use('/api', router);

var port = process.env.PORT || 4000;

app.listen(port);
console.log("Listening on port 4000...");