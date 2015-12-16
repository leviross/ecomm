app.factory('ValidationService', [function(){

	String.prototype.capitalize = function(){
        return this.toLowerCase().replace(/\b\w/g, function(m){
            return m.toUpperCase();
        });
	}

	return {
			
        CapitalizeName: function(name){
            return name.capitalize();
        }
	}


}]);