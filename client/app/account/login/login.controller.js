'use strict';

angular.module('roelvotingApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $rootScope) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          if ($rootScope.redirectTo == undefined || $rootScope.redirectTo.length < 2 ) {
              $location.path('/');
          }
          else {
              $location.path($rootScope.redirectTo);
          }
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });
