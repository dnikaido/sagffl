describe('HomeController', function() {
  var controller;
  var scope;

  beforeEach(module('sagffl'));
  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('HomeController', {
      $scope: scope
    });
  }));

  it('should load HomeController', function() {
    expect(controller).to.exist;
  });

  it('sets a welcome message on load', function() {
    expect(controller.message).to.equal('Welcome home!');
  });
});
