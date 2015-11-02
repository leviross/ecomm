var app = angular.module('EcommApp', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ngSanitize']);


app.config(['$routeProvider', function ($routeProvider) {


    $routeProvider.when("/dashboard", {
        templateUrl: "views/dashboard.html"
    }).otherwise({
      redirectTo: '/dashboard/'
  });

}]);    
   
app.run(function ($rootScope, $http, $location) {//Used for 
    console.log("app.run");//Not sure what else to put here any more now that auth is being done from the routes above...

});

angular.module('EcommApp')
.controller("MasterController", ['$rootScope', '$location', '$scope', function ($rootScope, $location, $scope) {


}]);








