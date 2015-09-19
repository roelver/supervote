'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('roelvotingApp'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/polls')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of polls to the scope', function () {
    $httpBackend.flush();
//    expect(scope.allPolls.length).toBe(3);
  });
});
