'use strict';

angular.module('roelvotingApp')
  .controller('PollCtrl', function ($scope, Auth, $http, $location) {

  	 $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.myPolls = [];

    $scope.me = Auth.getCurrentUser();

    $scope.currentPoll = {};

    $scope.editingPoll = false;
    $scope.addPoll = false;

    $scope.myHost =  $location.protocol()+'://'+$location.host()+':'+$location.port();

    $http.get('/api/polls/me/'+$scope.me.name)
      .success(function(myPolls) {
        $scope.myPolls = myPolls;
        for (var i=0;i<$scope.myPolls.length; i++) {
            $scope.myPolls[i].totalVotes = 0;
            $scope.myPolls[i].options.forEach(function(opt) {
                $scope.myPolls[i].totalVotes += opt.votes;
            });
        }
      }
    );

    $scope.newPoll = function() {
    	$scope.currentPoll = {};
    	$scope.currentPoll.question = '';
    	$scope.currentPoll.owner = $scope.me;
    	$scope.currentPoll.options = [];
    	$scope.currentPoll.options.push({text: '', votes: 0});
    	$scope.currentPoll.options.push({text: '', votes: 0});
    	$scope.addPoll = true;
      $scope.editingPoll = true;
    };

    $scope.edit = function(poll) {
    	$scope.currentPoll = poll;
      $scope.editingPoll = true;
    };

    $scope.addOption = function() {
    	if ($scope.currentPoll.options.length === 0 || $scope.currentPoll.options[$scope.currentPoll.options.length-1].text === '') {
    		return;
    	}
    	$scope.currentPoll.options.push({text: '', votes: 0});
    };

    $scope.validPoll = function() {
    	if ($scope.currentPoll.question == undefined || $scope.currentPoll.question.length < 2) { return false;}
    	var validOptions = 0;
      for (var i=0; i< $scope.currentPoll.options.length ; i++) {
      	if ($scope.currentPoll.options[i].text !== null && $scope.currentPoll.options[i].text.length > 0) {
      		validOptions++
      	}
      }
      if (validOptions < 2) { return false; }
      return true;
    }

    $scope.savePoll = function() {
    	if ($scope.addPoll) {
	      $http.post('/api/polls', $scope.currentPoll)
   	   .then( $scope.resetEdit );
    	}
    	else {
    		$http.put('/api/polls/'+$scope.currentPoll._id, $scope.currentPoll)
   	   .then( $scope.resetEdit );
    	}
    };

    $scope.resetEdit = function(response) {
    	   console.log(response);
    	   if ($scope.addPoll) {
	      	$scope.currentPoll._id = response.data._id;
		      $scope.myPolls.push($scope.currentPoll); 
    	   }
   	   $scope.editingPoll = false;
      	$scope.currentPoll = {};
	    	$scope.addPoll = false;
    };

    $scope.delete = function(poll) {
    	var ok = confirm('Do you really want to delte this question?');
    	if (ok) {
	      $http.delete('/api/polls/' + poll._id);
   	   var pos = $scope.myPolls.indexOf(poll);
      	$scope.myPolls.splice(pos,1);
    	}
    };

  });
