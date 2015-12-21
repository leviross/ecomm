var app = angular.module('EcommApp', ['ngRoute', 'ui.bootstrap', 'ValidationModule', 'ngAnimate']);


app.config(['$routeProvider', function ($routeProvider) {


    $routeProvider.when('/', {
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
    }).when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    }).when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterController'
    }).when('/reset-password', {
        templateUrl: 'views/reset-password.html',
        controller: 'ResetPasswordController'
    }).when('/shop', {
        templateUrl: 'views/shop.html',
        controller: 'ShopController'
    }).otherwise({
      redirectTo: '/'
    });

    //TODO: put the route logic functions here to make sure 

}]);    
   
app.run(function ($rootScope, $http, $location) {//Used for 
    console.log('app.run');//Not sure what else to put here any more now that auth is being done from the routes above...

});

angular.module('EcommApp')
.controller('MasterController', ['$rootScope', '$location', '$scope', function ($rootScope, $location, $scope) {


}]);








