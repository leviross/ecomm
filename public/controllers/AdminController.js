app.controller('AdminController', ['$scope', '$rootScope', 'UserService', '$routeParams', '$location', function($scope, $rootScope, UserService, $routeParams, $location) {
	
	var Tabs = [ 'views/admin/partials/users.html', 'views/admin/partials/brands.html', 'views/admin/partials/warrantyTypes.html', 'views/admin/partials/repairTypes.html', 'views/admin/partials/taxRate.html', 'views/admin/partials/districts.html'  ];
	
	$scope.TabView = Tabs[0];	
	$scope.Tab = 0;
	
	
	if($routeParams.type == "users") {
		$scope.Tab = 0;
		$scope.TabView = Tabs[0];
	}else if($routeParams.type == "brands") {
		$scope.Tab = 1;
		$scope.TabView = Tabs[1];
	}else if($routeParams.type == "warranty-types") {
		$scope.Tab = 2;
		$scope.TabView = Tabs[2];
	}else if($routeParams.type == "repair-types") {
		$scope.Tab = 3;
		$scope.TabView = Tabs[3];
	}else if($routeParams.type == "tax-rate") {
		$scope.Tab = 4;
		$scope.TabView = Tabs[4];
		Globals.GetTaxRate(function (rate) {
			$scope.TaxRate = rate;
		});
	}else if($routeParams.type == "districts") {
		$scope.Tab = 5;
		$scope.TabView = Tabs[5];
	}

	$scope.SelectTab = function (setTab) {
		if(setTab == 0) {
			$location.path('/admin/users');
		}else if(setTab == 1) {
			$location.path('/admin/warranty-types');
		}else if(setTab == 2) {
			$location.path('/admin/repair-types');
		}else if(setTab == 3) {
			$location.path('/admin/tax-rate');
		}else if(setTab == 4) {
			$location.path('/admin/districts');
			$scope.$broadcast('InitDistrictPage');
		}
	}

	$scope.IsSelected = function (checkTab) {
		return $scope.Tab === checkTab;
	}


}]);