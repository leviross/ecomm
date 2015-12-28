function UserController($scope, UserService, ValidationService, $location){

	this.DisplayMode = 'list';
	this.UserTypes = [{id: "1", name: "Admin", value: true}, {id: "2", name: "Non-Admin", value: false}];
	this.AllUsers = UserService.GetCachedUsers("UsersArray");
	var self = this;
	var currentIndex = null;

	if(this.AllUsers == null || this.AllUsers == undefined){
		UserService.GetAllUsers(function(usersArray) {
			self.AllUsers = usersArray;
		});
	}

	this.EditUser	= function(user, index){
		currentIndex = index;
		this.DisplayMode = 'edit';
		this.FirstName = user.FirstName;
		this.LastName = user.LastName;
		this.Email = user.Email;
		this.IsAdmin = user.IsAdmin;
		this._id = user._id;
	}


	this.NewUser = function(){
		this.DisplayMode = 'edit';
		this.FirstName = "";
		this.LastName = "";
		this.Email =  "";
		this.Password1 = "";
		this.Password2 = "";
		this.IsAdmin = "2";
		this._id = null;
		this.ShowChangePassword = true;
	}

	this.CheckFirstName = function(){
		if(!this._id){
			this.FirstName = ValidationService.CapitalizeName(this.FirstName);
		}
	}
	this.CheckLastName = function(){
		if(!this._id){
			this.LastName = ValidationService.CapitalizeName(this.LastName);
		}
	}

	this.CreateUser = function (){
		var NewUserObj = {FirstName: this.FirstName, LastName: this.LastName, Email: this.Email, Password: this.Password1, 
			IsAdmin: this.IsAdmin, IsEmployee: true}
		UserService.CreateNewUser(NewUserObj, function(result){
			alertify.notify('User: ' + result.User.FirstName + ' was created.', 'success', 5, function(){});
			self.AllUsers.push(result.User);
			self.DisplayMode = 'list';
			self.UserForm.$setPristine();
		});
		
	}	

	this.ToggleChangePassword = function(){
		this.Password1 = "";
		this.Password2 = "";
		
		this.ShowChangePassword = !this.ShowChangePassword; 
	}

	$scope.$on('ShowUserDetails', function(e){
		$scope.UserForm.$setPristine();
	});

	this.UpdateUser = function(){
		//TODO: refactor and put alertify calls in sep fn
		var UpdatedUserObj = {_id: this._id, FirstName: this.FirstName, LastName: this.LastName, Email: this.Email, Password: this.Password1, 
			IsAdmin: this.IsAdmin, IsEmployee: true}
		UserService.UpdateUser(UpdatedUserObj, function(result) {
			if(result.data.PasswordUpdated && !result.data.Error){
				alertify.notify('User and Password Updated!', 'success', 5, function(){});	
				self.Password1 = "";
				self.Password2 = "";
				ClearForm();
				self.AllUsers[currentIndex] = result.data.User;
			}else if(!result.data.PasswordUpdated && !result.data.UserUpdated && !result.data.Error){
				alertify.notify('Password already in use, login or choose another password.', 'error', 5, function(){});
				self.Password1 = "";
				self.Password2 = "";
				self.UserForm.$setPristine();
			}else if(result.data.UserUpdated && !result.data.PasswordUpdated && !result.data.Error){
				alertify.notify('User Updated!', 'success', 5, function(){});
				self.Password1 = "";
				self.Password2 = "";
				ClearForm();
				self.AllUsers[currentIndex] = result.data.User;
			}else if(result.data.Error){
				alertify.notify('Login token expired, please login again.', 'error', 5, function(){});
				$location.path('/login');
			}
		});
	}

	this.DeleteUser = function(user, index){
		UserService.DeleteUser(user._id, function(result){
			self.AllUsers.splice(index, 1);
			UserService.PutCachedUsers("UsersArray", this.AllUsers);
			alertify.notify('That user was deleted.', 'error', 5, function(){});
		})
	}

	this.BackToUsers = function(){
		this.AllUsers = UserService.GetCachedUsers("UsersArray");  
		ClearForm();
	}

	function ClearForm(){
		self.DisplayMode = 'list';
		self.UserForm.$setPristine();
		self.ShowChangePassword = false;

	}
	
}

UserController.$inject = ['$scope', 'UserService', 'ValidationService', '$location'];

app.controller('UserController', UserController);