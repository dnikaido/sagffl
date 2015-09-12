describe('UtilsService', function() {
  var window;
  var localstorage;
  var testKey = 'testString';
  var testValue = 'test string';
  var testObjectKey = 'testObject';
  var testObjectValue = {test: 'test object'};

  beforeEach(function() {
    module('utils');
    inject(function($window, $localstorage ) {
      window = $window;
      localstorage = $localstorage;
    });

    window.localStorage.clear();
    window.localStorage[testKey] = testValue;
    window.localStorage[testObjectKey] = JSON.stringify(testObjectValue);
  });

  describe('#get', function() {
    it('should get testString from localStorage', function() {
      var testString = localstorage.get(testKey);

      expect(testString).to.equal(testValue);
    });

    it('should return a defaultValue if key is not found', function() {
      var defaultValue = 'default value';
      var getString = localstorage.get('blahblah', defaultValue);

      expect(getString).to.equal(defaultValue);
    });
  });

  describe('#set', function() {
    it('should add a new value to localStorage', function() {
      var newKey = 'newString';
      var newValue = 'new value';
      localstorage.set(newKey, newValue);

      expect(window.localStorage[newKey]).to.equal(newValue);
    });
  });


  describe('#getObject', function() {
    it('should get testObject from localStorage', function() {
      var testObject = localstorage.getObject(testObjectKey);

      expect(testObjectValue).to.deep.equal(testObject);
    });

    it('should return null if key is not found', function() {
      var testObject = localstorage.getObject('blahblah');

      expect(testObject).to.be.null;
    });
  });

  describe('#setObject', function() {
    it('should add a new object to localStorage', function() {
      var newKey = 'newObject';
      var newValue = {foo: 'bar'};
      localstorage.setObject(newKey, newValue);

      expect(JSON.parse(window.localStorage[newKey])).to.deep.equal(newValue);
    });
  });

  describe('#clear', function() {
    it('should empty localStorage', function() {
      expect(window.localStorage.length).to.equal(2);

      localstorage.clear();

      expect(window.localStorage.length).to.equal(0);
    });
  });
});
