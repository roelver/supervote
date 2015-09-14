'use strict';

angular.module('roelvotingApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $cookieStore) {

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.blocked = $cookieStore.get('blocked');

    $scope.allPolls = [];

    $http.get('/api/polls').success(function(allPolls) {
      $scope.allPolls = allPolls;
      // for (var i=0; i < $scope.allPolls.length; i++ ) {
      //    var optionData = [];
      //    for (var j=0; j < $scope.allPolls[i].options.length; j++) {
      //       optionData.push({c: [{v: $scope.allPolls[i].options[j].text},{v: $scope.allPolls[i].options[j].votes}]});
      //    }
      //    $scope.allPolls[i].graphDataRows = { 'rows': optionData};
      // }
      console.log('Blocked:',$scope.blocked);
      for (var i=0;i<$scope.allPolls.length; i++) {
        // $scope.allPolls[i].selected = $scope.allPolls[i].options[0]._id;
        $scope.allPolls[i].voted  = false;
        if ($scope.blocked && $scope.blocked.length > 0) {
          $scope.allPolls[i].voted = ($scope.blocked.indexOf($scope.allPolls[i]._id) >= 0);         
        }
      }
    });

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
                console.log(data);
              }, function(response) {
                console.log('Error:'+response);
              });
            break;
          }
        }
      }
    }

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.blockQuestion = function(id) {
      if (!$scope.blocked) {
        $scope.blocked = [];
      }
      $scope.blocked.push(id);
      $cookieStore.put('blocked', $scope.blocked);
    };

  });
