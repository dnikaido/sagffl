describe('PhotosController', function() {
  var controller, scope;

  beforeEach(module('sagffl'));
  beforeEach(module('utils'));
  beforeEach(module('sagffl.mock.services'));
  beforeEach(module('facebook'));
  beforeEach(inject(function($controller, $rootScope, _$localstorage_, _Facebook_) {
    scope = $rootScope.$new();
    controller = $controller('PhotosController', {
      $scope : scope,
      $localstorage : _$localstorage_,
      Facebook : _Facebook_
    });
  }));

  it('should load PhotosController', function() {
    expect(controller).to.exist;
  });

  it('should have an empty photoUrls', function() {
    expect(controller.photoUrls).to.be.an('array');
  });

  describe('#getPhotos', function() {
    it('should return a list of photo urls', function() {
      expect(controller.photoUrls).to.eql(getPhotosRet);
    });
  });

});
