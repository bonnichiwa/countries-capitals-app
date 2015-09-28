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

  .controller('CountryCtrl', function($scope, $http) {
    $scope.countryList = function() {
      var request = {
        callback: "JSON_CALLBACK"
      };

      $http({
        method: 'JSONP',
        url: "http://api.geonames.org/countryInfoJSON?username=bonnichiwa",
        params: request
      })
      .then(function(result) {
        $scope.countries = result.data.geonames;
        console.log("Found countries");
        console.log(result);
      },
      function(error) {
        alert('Error: Unable to retrieve countries.');
      })
    };
  })

  .controller('CapitalCtrl', function($scope) {
    //empty for now
  });
