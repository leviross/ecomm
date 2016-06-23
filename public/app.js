var app = angular.module('EcommApp', ['ngRoute', 'ui.bootstrap', 'ValidationModule']);


app.config(['$routeProvider', function ($routeProvider) {    

    $routeProvider.when('/home', {
        templateUrl: 'views/homepage.html',
        controller: 'HomePageController as HomePage'
    }).when('/admin', {
        templateUrl: 'views/admin/admin.html',
        controller: 'AdminController as Admin'
    }).when('/admin/:type', {
        templateUrl: 'views/admin/admin.html',
        controller: 'AdminController as Admin'
    }).when('/add-product', {
    	templateUrl: 'views/add-product.html',
    	controller: 'AddProductController as AddProduct'
    }).when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController as Login'
    }).when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterController as Register'
    }).when('/reset-password', {
        templateUrl: 'views/reset-password.html',
        controller: 'ResetPasswordController as ResetPassword'
    }).when('/shop/:title', {
        templateUrl: 'views/detail.html',
        controller: 'DetailController as Detail'
    }).when('/shopping-cart', {
        templateUrl: 'views/cart.html',
        controller: 'CartController as Cart'
    }).otherwise({
      redirectTo: '/home'
    });

    //TODO: put the route logic functions here to make sure 
    

}]);    
   
app.run(function ($rootScope, $http, $location) {
    //Run blocks are used as a main method, it executes after services have been configured 
    // and the injector has been created
    console.log('app.run');
    //SetActiveNav();
    $rootScope.$on("$locationChangeStart", function(event, next, current) { 
        // handle route changes    
        //alert("route changed!!"); 
        //console.log($location);
        SetActiveNav();


    });
    function SetActiveNav() {

        var domain = $location.path().toLowerCase().split("/", 2);
        if (domain[1] == "") return;
        $(document).ready(function() {
            $('#navList').children().each(function(index, li) {
                //console.log($(li).attr("id"));
                var id = $(li).attr("id");
                
                if (domain[1] == id) {
                    $(li).addClass('active');
                } else {
                    $(li).removeClass('active');
                }

            });
        
		});
    }
    
});

angular.module('EcommApp')
.controller('MasterController', ['$rootScope', '$location', '$scope', function ($rootScope, $location, $scope) {
    //console.log("Master Ctrl always runnin...");

}]);








