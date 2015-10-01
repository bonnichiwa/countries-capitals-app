angular.module('cncApp', ['ngRoute', 'ngAnimate', 'geolocation'])
  
  .run(function($rootScope, $location, $timeout) {
    $rootScope.$on('$routeChangeError', function() {
      $location.path('/error');
    });
    $rootScope.$on('$routeChangeStart', function() {
      $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function() {
      $timeout(function() {
        $rootScope.isLoading = false;
      }, 1500);
    });    
  })

  .config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', {
        templateUrl : 'home.html',
        controller : 'HomeCtrl'
    })
    .when('/countries', {
      templateUrl : 'countries.html', 
      controller: 'CountryListCtrl'
    })
    .when('/countries/:countryName', {
      templateUrl : 'capital.html',
      controller: 'CountryDetailCtrl'
    })
    .when('/error', {
      template : '<h1>Error - Page Not Found</h1>'
    })
    .otherwise('/error');
  }])

  .controller('HomeCtrl', function($scope) {
      //empty for now
  })

  .controller('CountryListCtrl', ['$scope', '$http', function($scope, $http) {

    //Countries List
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
  }])

  .controller('CountryDetailCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

    $scope.countryCode = $routeParams.countryName;
    console.log($scope.countryCode);

    // neighboursInfo(geonameId);

    //Capital City Info  

      var request = {
        country: $scope.countryCode,
        callback: "JSON_CALLBACK"
      };

      $http({
        method: 'JSONP',
        url: "http://api.geonames.org/countryInfoJSON?username=bonnichiwa",
        params: request
      })
      .then(function(result) {
        $scope.capital = result.data.geonames;
        $scope.capitalImg = result.data.geonames[0].countryCode.toLowerCase();
        $scope.capitalGeo = result.data.geonames[0].geonameId;
        console.log("Found capital");
        console.log(result);

        $http({
          method: 'JSONP',
          url: "http://api.geonames.org/neighboursJSON?",
          params: {
            username: "bonnichiwa",
            geonameId: $scope.capitalGeo,
            callback: "JSON_CALLBACK"
          }
        })
        .then(function(result) {
          $scope.neighbours = result.data.geonames;
          console.log("Found neighbours");
          console.log(result);
        },
        function(error) {
          alert('Error: Unable to find neighbours.');
        })
          },
        function(error) {
          alert('Error: Unable to retrieve capital.');
        })
      }

    // Neighbours 



])

