function SettingsService() {

	var sizes = [{Size: "10X16"}, {Size: "12X20"}, {Size: "16X32"}];


	var ServiceObject = {

		GetSizes: function() {
			return sizes;
		}
	}

	return ServiceObject;


}




app.factory('SettingsService', SettingsService);