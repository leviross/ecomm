app.controller('ShopController', ['$scope', function($scope){

	$scope.Category = "Sofas";
	$scope.Categories = [{name: "Sofas", count: 32, class: "active", types: [{kind: "3 Seaters"}, {kind: "2 Seaters"}]}, {name: "Loveseats", count: 40, class: "", types: [{kind: "My Loveseat"}, {kind: "Her Loveseat"}, {kind: "That One"}]}, {name: "Chairs", count: 15, class: "", types: [{kind: "Outdoor"}, {kind: "Indoor"}, {kind: "Dining Room"}]}, {name: "Tables", count: 55, class: "", types: [{kind: "Dining Room"}, {kind: "Kitchen"}, {kind: "Bar"}]}];


	$scope.SelectCategory = function(event, index){
		$scope.Categories.forEach(function(category, index){
			category.class = "";
		});
		$scope.Categories[index].class = "active";
		//TODO: select the real category data when i wire up the DB...
	}


}]);