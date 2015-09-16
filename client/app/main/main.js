'use strict';

angular.module('roelvotingApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/dopoll/:pollid', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        authenticate: true
      })
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });