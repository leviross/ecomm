app.controller('UserController', function($scope, UserService, ValidationService, $location){

	this.DisplayMode = 'list';
	this.UserTypes = [{id: "1", name: "Admin", value: true}, {id: "2", name: "Non-Admin", value: false}];
	this.AllUsers = UserService.GetCachedUsers("UsersArray");
	var self = this;

	if(this.AllUsers == null || this.AllUsers == undefined){
		UserService.GetAllUsers(function(usersArray) {
			self.AllUsers = usersArray;
		});
	}

	this.ShowEditUser	= function(user){
		this.DisplayMode = 'edit';
		this.UserDetails = user;
	}


	this.NewUser = function(){
		this.DisplayMode = 'edit';
		this.UserDetails = {
			FirstName: "",
			LastName: "",
			Email: "",
			Password1: "",
			Password2: "",
			IsAdmin: "2",
			_id: null,
			ShowChangePassword: true
		}
	}

	this.CheckFirstName = function(){
		if(!this.UserDetails._id){
			this.UserDetails.FirstName = ValidationService.CapitalizeName(this.UserDetails.FirstName);
		}
	}
	this.CheckLastName = function(){
		if(!this.UserDetails._id){
			this.UserDetails.LastName = ValidationService.CapitalizeName(this.UserDetails.LastName);
		}
	}

	this.CreateUser = function (){
		var NewUserObj = {FirstName: this.UserDetails.FirstName, LastName: this.UserDetails.LastName, Email: this.UserDetails.Email, Password: this.UserDetails.Password1, 
			IsAdmin: this.UserDetails.IsAdmin, IsEmployee: true}
		UserService.CreateNewUser(NewUserObj, function(retval){
			self.UserDetails = retval;
			//self.DisplayMode = 'list';
			self.UserForm.$setPristine();
			console.log(retval);
		});
		
	}	

	this.ToggleChangePassword = function(){
		this.UserDetails.Password1 = "";
		this.UserDetails.Password2 = "";
		
		this.UserDetails.ShowChangePassword = !this.UserDetails.ShowChangePassword; 
	}

	$scope.$on('ShowUserDetails', function(e){
		$scope.UserForm.$setPristine();
	});

	this.UpdateUser = function(){
		//TODO: refactor and put alertify calls in sep fn
		UserService.UpdateUser(this.UserDetails, function(retval) {
			if(retval.data.PasswordUpdated && !retval.data.Error){
				self.UserDetails.Password1 = "";
				self.UserDetails.Password2 = "";
				alertify.notify('User and Password Updated!', 'success', 5, function(){});	
				self.UserForm.$setPristine();
				self.UserDetails.ShowChangePassword = false;
			}else if(!retval.data.PasswordUpdated && !retval.data.UserUpdated && !retval.data.Error){
				alertify.notify('Please choose new Password', 'error', 5, function(){});
				self.UserDetails.Password1 = "";
				self.UserDetails.Password2 = "";
				self.UserForm.$setPristine();
			}else if(retval.data.UserUpdated && !retval.data.PasswordUpdated && !retval.data.Error){
				alertify.notify('User Updated!', 'success', 5, function(){});
				self.UserDetails.Password1 = "";
				self.UserDetails.Password2 = "";
				ClearForm();
			}else if(retval.data.Error){
				alertify.notify('Login token expired, please login again.', 'error', 5, function(){});
				$location.path('/login');
			}
		});
	
		
	}

	this.BackToUsers = function(){
		this.AllUsers = UserService.GetCachedUsers("UsersArray");  
		ClearForm();
	}

	function ClearForm(){
		self.DisplayMode = 'list';
		self.UserForm.$setPristine();
		self.UserDetails.ShowChangePassword = false;

	}
	


});