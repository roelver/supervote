'use strict';

angular.module('roelvotingApp')
  .controller('PollCtrl', function ($scope, Auth, $http) {

  	 $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.myPolls = [];

    $scope.me = Auth.getCurrentUser();

    $scope.newPoll = {};

    $scope.addingPoll = false;

    $http.get('/api/polls/me/'+$scope.me.name)
      .success(function(myPolls) {
        $scope.myPolls = myPolls;
      }
    );

    $scope.newPoll = function() {
    	$scope.newPoll = {};
    	$scope.newPoll.question = '';
    	$scope.newPoll.owner = $scope.me;
    	$scope.newPoll.options = [];
    	$scope.newPoll.options.push({text: '', votes: 0});
      $scope.addingPoll = true;
    };

    $scope.addOption = function() {
    	if ($scope.newPoll.options.length === 0 || $scope.newPoll.options[$scope.newPoll.options.length-1].text === '') {
    		return;
    	}
    	$scope.newPoll.options.push({text: '', votes: 0});
    };

    $scope.savePoll = function() {
      if($scope.newPoll.question === null || $scope.newPoll.options.length === 0) {
        return;
      }
      $http.post('/api/polls', $scope.newPoll);
      $scope.myPolls.push($scope.newPoll); 
      $scope.addingPoll = false;
      $scope.newPoll = null;
    };

    $scope.delete = function(poll) {
      $http.delete('/api/polls/' + poll._id);
      var pos = $scope.myPolls.indexOf(poll);
      $scope.myPolls.splice(pos,1);
    };

  });
