describe('HomeController', function() {
  var scope,
    controller;
  beforeEach(module('starter'));
  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('HomeController', {
      $scope: scope
    });
  }));

  it('sets a welcome message on load', function() {
    expect(controller.message).to.equal('Welcome home!');
  });
});
