angular.module('cncApp', ['ngRoute', 'ngAnimate', 'geolocation'])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', {
        templateUrl : 'home.html',
        controller : 'HomeCtrl'
    })
    .when('/countries', {
      templateUrl : 'countries.html' 
      // controller : 'CountryCtrl'
    })
    .when('/countries/:country', {
      templateUrl : 'capital.html'
      // controller : 'CountryCtrl'
    })
  }])

  .controller('HomeCtrl', function($scope) {
      //empty for now
  })

  .controller('CountryCtrl', function($scope, $http, $routeParams) {
    // $scope.country = $routeParams.country;

    $scope.countryList = function() {
      var request = {
        username: "bonnichiwa",
        callback: "JSON_CALLBACK"
      };

      $http({
        method: 'JSONP',
        cache: true,  
        url: "http://api.geonames.org/countryInfoJSON?",
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
    }


      
    $scope.countryInfo = function(countryCode) {

      $routeParams.country = countryCode;

      var request = {
        country: countryCode,
        callback: "JSON_CALLBACK"
      };

      $http({
        method: 'JSONP',
        url: "http://api.geonames.org/countryInfoJSON?username=bonnichiwa",
        params: request
      })
      .then(function(result) {
        $scope.capital = result.data.geonames;
        console.log("Found capital");
        console.log(result);
      },
      function(error) {
        alert('Error: Unable to retrieve capital.');
      })
    }
  })

  .controller('CapitalCtrl', function($scope, $http) {
    // $scope.countryInfo = function(countryCode) {

    //   var request = {
    //     country: countryCode,
    //     callback: "JSON_CALLBACK"
    //   };

    //   $http({
    //     method: 'JSONP',
    //     url: "http://api.geonames.org/countryInfoJSON?username=bonnichiwa",
    //     params: request
    //   })
    //   .then(function(result) {
    //     $scope.capital = result.data.geonames;
    //     console.log("Found capital");
    //     console.log(result);
    //   },
    //   function(error) {
    //     alert('Error: Unable to retrieve capital.');
    //   })
    // }
  });
