describe('MenuController', function() {
  var controller;
  var ionicMaterialInk;

  beforeEach(module('sagffl'));
  beforeEach(module('sagffl.mock.services'));
  beforeEach(inject(function($controller, _ionicMaterialInk_) {
    ionicMaterialInk = _ionicMaterialInk_;
    controller = $controller('MenuController');
  }));

  describe('#activate', function() {
    it('should load MenuController', function() {
      expect(controller).to.exist;
    });

    it('should call displayEffect', function() {
      expect(ionicMaterialInk.displayEffect).to.have.been.calledOnce;
    });
  });


});
