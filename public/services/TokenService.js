app.factory('TokenService', ['$http', function($http){


	var sessionToken = sessionStorage.getItem('Token');
    //console.log(sessionToken);

    return {
    	GetCurrentToken: function(){
    		return sessionToken;
    	}
    }


}]);