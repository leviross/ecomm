app.controller('AdminController', function($scope, $rootScope, UserService, $routeParams, $location) {
	
	this.Tabs = [ 'views/admin/partials/users.html', 'views/admin/partials/brands.html', 'views/admin/partials/categories.html', 'views/admin/partials/repairTypes.html', 'views/admin/partials/taxRate.html', 'views/admin/partials/districts.html'  ];
	var self = this;
	
	this.TabView = this.Tabs[0];	
	this.Tab = 0;
	
	
	if($routeParams.type == "users") {
		this.Tab = 0;
		this.TabView = this.Tabs[0];
	}else if($routeParams.type == "brands") {
		this.Tab = 1;
		this.TabView = this.Tabs[1];
	}else if($routeParams.type == "categories") {
		this.Tab = 2;
		this.TabView = this.Tabs[2];
	}else if($routeParams.type == "repair-types") {
		this.Tab = 3;
		this.TabView = this.Tabs[3];
	}else if($routeParams.type == "tax-rate") {
		this.Tab = 4;
		this.TabView = this.Tabs[4];
		Globals.GetTaxRate(function (rate) {
			this.TaxRate = rate;
		});
	}else if($routeParams.type == "districts") {
		this.Tab = 5;
		this.TabView = this.Tabs[5];
	}

	this.SelectTab = function (setTab) {
		if(setTab == 0) {
			$location.path('/admin/users');
		}else if(setTab == 1) {
			$location.path('/admin/categories');
		}else if(setTab == 2) {
			$location.path('/admin/repair-types');
		}else if(setTab == 3) {
			$location.path('/admin/tax-rate');
		}else if(setTab == 4) {
			$location.path('/admin/districts');
			self.$broadcast('InitDistrictPage');
		}
	}

	this.IsSelected = function (checkTab) {
		return self.Tab === checkTab;
	}


});