var app = angular.module('EcommApp', ['ngRoute', 'ui.bootstrap', 'ValidationModule']);


app.config(['$routeProvider', function ($routeProvider) {


    $routeProvider.when('/homepage', {
        templateUrl: 'views/homepage.html',
        controller: 'HomePageController'
    }).when('/admin', {
        templateUrl: 'views/admin/admin.html',
        controller: 'AdminController'
    }).when('/admin/:type', {
        templateUrl: 'views/admin/admin.html',
        controller: 'AdminController'
    }).when('/add-product', {
    	templateUrl: 'views/add-product.html',
    	controller: 'AddProductController'
    }).otherwise({
      redirectTo: '/homepage/'
  });

}]);    
   
app.run(function ($rootScope, $http, $location) {//Used for 
    console.log('app.run');//Not sure what else to put here any more now that auth is being done from the routes above...

});

angular.module('EcommApp')
.controller('MasterController', ['$rootScope', '$location', '$scope', function ($rootScope, $location, $scope) {


}]);








