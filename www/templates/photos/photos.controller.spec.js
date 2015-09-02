describe('PhotosController', function() {
  var controller;

  beforeEach(module('sagffl'));
  beforeEach(inject(function($controller) {
    controller = $controller('PhotosController');
  }));

  it('should load PhotosController', function() {
    expect(controller).to.exist;
  });

});
