describe('HomeController', function() {
  var controller;
  var rootScope;
  var scope;
  var User;
  var HomeController;
  var spys;

  beforeEach(module('mock.state'));
  beforeEach(module('mock.services'));
  beforeEach(function() {
    spys = {};
    module('sagffl');
    inject(function($controller, $rootScope, _User_) {
      controller = $controller;
      rootScope = $rootScope;
      scope = rootScope.$new();
      User = _User_;
    });

    HomeController = controller('HomeController', {
      $scope: scope,
      User: User
    });
  });

  it('should load HomeController', function() {
    expect(HomeController).to.exist;
  });

  it('sets a welcome message on load', function() {
    expect(HomeController.message).to.equal('Welcome home!');
  });

});
