'use strict';

angular.module('roelvotingApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $cookieStore, $routeParams) {

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.blocked = $cookieStore.get('blocked');

    $scope.allPolls = [];


    $scope.directLink = function() {
      return ($routeParams.pollid !== undefined);
    } 

    $scope.getData = function() {
        var pollid = $routeParams.pollid;
        $http.get('/api/polls'+(pollid == undefined ? '': '/'+pollid ))
          .success(function(allPolls) {
              $scope.allPolls = allPolls;

              console.log('Blocked:',$scope.blocked, $scope.allPolls);
              for (var i=0;i<$scope.allPolls.length; i++) {
                // $scope.allPolls[i].selected = $scope.allPolls[i].options[0]._id;
                $scope.allPolls[i].voted  = false;
                if ($scope.blocked && $scope.blocked.length > 0) {
                  $scope.allPolls[i].voted = ($scope.blocked.indexOf($scope.allPolls[i]._id) >= 0);         
                }
                $scope.allPolls[i].totalVotes = 0;
                $scope.allPolls[i].options.forEach(function(opt) {
                  $scope.allPolls[i].totalVotes += opt.votes;
                });
                console.log(''+i+' Totalvotes:'+$scope.allPolls[i].totalVotes);
              }
            });

    };


    $scope.vote = function(idx) {

        console.log('Vote called '+idx+ ' Chosen: '+$scope.allPolls[idx].selected);
        if ($scope.allPolls[idx].selected) {
          for( var i=0;i < $scope.allPolls[idx].options.length; i++) {
            if ($scope.allPolls[idx].selected === $scope.allPolls[idx].options[i]._id) {
              $scope.allPolls[idx].options[i].votes++;
              console.log('Vote:' + $scope.allPolls[idx].question + ' ' +$scope.allPolls[idx].options[i].votes);
              $scope.allPolls[idx].voted  = true;
              $http.put('/api/polls/'+$scope.allPolls[idx]._id, $scope.allPolls[idx])
                .then(function(data) {
                  $scope.blockQuestion($scope.allPolls[idx]._id);
                  $scope.allPolls[idx].totalVotes++;
                  console.log(data);
                }, function(response) {
                  console.log('Error:'+response);
                });
              break;
            }
          }
        }

    };

    $scope.allowInput = function(idx) {
      return $scope.isLoggedIn() && !$scope.allPolls[idx].voted;
    };

    $scope.blockQuestion = function(id) {
      if (!$scope.blocked) {
        $scope.blocked = [];
      }
      $scope.blocked.push(id);
      $cookieStore.put('blocked', $scope.blocked);
    };

    $scope.getData();

  });
