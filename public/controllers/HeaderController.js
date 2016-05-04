function HeaderController($scope, $rootScope, $location, UserService, ProductService, CartService, $timeout, SettingsService){

	this.Cart = 0;
	var self = this;

	var sessionUser = sessionStorage.getItem('User');

	if(sessionUser == "" || sessionUser == "undefined"){
		this.User = null;
	}else{
		this.User = JSON.parse(sessionUser);
	}

	CartService.GetCart(function(cart) {
			for(var i = 0; i < cart.length; i++) {
				self.Cart += cart[i].Quantity;
			}
		});		


	$scope.$on("UpdateCart", function(event) {
		CartService.GetCart(function(cart) {
			
			self.Cart = 0;
			for(var i = 0; i < cart.length; i++) {
				self.Cart += cart[i].Quantity;
			}

			var cartButton = $("a.btn-transparent");
			cartButton.addClass("btn-primary active");
			$timeout(function() {
				cartButton.removeClass("btn-primary active");
			}, 450);
		});		
	});

	//this.User = UserService.GetLoggedInUser();
	
	$scope.$on('UserLoggedIn', function(event, user) {
		self.User = user;
	});

	$scope.$on('ChooseActiveNav', function(event, index) {
		var elemArr = [];
		$('#navList').children().each(function(index, li) {
			$(li).removeClass('active');
			elemArr.push($(li));
		});
		elemArr[index].addClass('active');	
	});

	this.GoToLogin = function() {
		$location.path('/login');
	}

	this.Logout = function() {
		UserService.Logout();
		this.User = null;
	}

	this.ActiveClass = function(event) {
		$('#navList li').each(function(index, li) {
			$(li).removeClass('active');
		});
		event.target.parentElement.className = 'active';
	}

	this.BackToSelected = function() {
		ProductService.GetProductDetail(function(product) {
			$location.path("/shop/" + SettingsService.WithDashes(product.Title));
		});
		
	}
    

}

HeaderController.$inject = ['$scope', '$rootScope', '$location', 'UserService', 'ProductService', 'CartService', '$timeout', 'SettingsService'];

app.controller('HeaderController', HeaderController);