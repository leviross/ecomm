function HeaderController($scope, $rootScope, $location, UserService, ProductService){

	this.Cart = [];
	var self = this;

	var sessionUser = sessionStorage.getItem('User');

	if(sessionUser == "" || sessionUser == "undefined"){
		this.User = null;
	}else{
		this.User = JSON.parse(sessionUser);
	}

	//this.User = UserService.GetLoggedInUser();
	
	$scope.$on('UserLoggedIn', function(event, user){
		self.User = user;
	});

	$scope.$on('ChooseActiveNav', function(event, index){
		var elemArr = [];
		$('#navList').children().each(function(index, li){
			$(li).removeClass('active');
			elemArr.push($(li));
		});
		elemArr[index].addClass('active');	
	});

	this.GoToLogin = function(){
		$location.path('/login');
	}

	this.Logout = function(){
		UserService.Logout();
		this.User = null;
	}

	this.ActiveClass = function(event){
		$('#navList li').each(function(index, li){
			$(li).removeClass('active');
		});
		event.target.parentElement.className = 'active';
	}

	function withDashes(title) {
		return title.replace(/\s+/g, "-");		
	}

	this.BackToSelected = function() {
		ProductService.GetProductDetail(function(product) {
			$location.path("/shop/" + withDashes(product.Title));
		});
		
	}
    

}

HeaderController.$inject = ['$scope', '$rootScope', '$location', 'UserService', 'ProductService'];

app.controller('HeaderController', HeaderController);