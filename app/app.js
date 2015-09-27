angular.module('cncApp', ['ngRoute', 'ngAnimate', 'geolocation'])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', {
        templateUrl : 'home.html',
        controller : 'HomeCtrl'
    })
    .when('/countries', {
      templateUrl : 'countries.html' ,
      controller : 'CountryCtrl'
    })
    .when('/countries/:country/capital', {
      templateUrl : 'capital.html',
      controller : 'CapitalCtrl'
    })
  }])

  .controller('HomeCtrl', function($scope) {
      //empty for now
  })
  .controller('CountryCtrl', function($scope) {
    //empty for now
  })
  .controller('CapitalCtrl', function($scope) {
    //empty for now
  });
