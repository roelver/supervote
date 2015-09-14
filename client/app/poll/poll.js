'use strict';

angular.module('roelvotingApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/poll', {
        templateUrl: 'app/poll/poll.html',
        controller: 'PollCtrl',
        authenticate: true
      });
  });
