describe('MenuController', function() {
  var controller;
  var ionicMaterialInk;
  var MenuController;
  var spys;

  beforeEach(module('mock.state'));
  beforeEach(module('mock.services'));
  beforeEach(function() {
    spys = {};
    module('sagffl');
    inject(function($controller, ionicMaterialInkSpy) {
      controller = $controller;
      ionicMaterialInk = ionicMaterialInkSpy;
    });

    MenuController = controller('MenuController', {
      ionicMaterialInk: ionicMaterialInk
    });
  });

  describe('#activate', function() {
    it('should load MenuController', function() {
      expect(MenuController).to.exist;
    });

    it('should call displayEffect', function() {
      expect(ionicMaterialInk.displayEffect).to.have.been.calledOnce;
    });
  });


});
