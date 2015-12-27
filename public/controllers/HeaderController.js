function HeaderController($scope, $rootScope, $location, UserService){

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
    

}

HeaderController.$inject = ['$scope', '$rootScope', '$location', 'UserService'];

app.controller('HeaderController', HeaderController);