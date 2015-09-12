(function() {
  'use strict';
  angular.module('utils', [])
    .factory('$localstorage', LocalStorage);

  LocalStorage.$inject = ['$log', '$window'];
  function LocalStorage($log, $window) {
    $log.debug('loading $localstorage');

    return {
      get: get,
      set: set,
      getObject: getObject,
      setObject: setObject,
      clear: clear
    };

    function get(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    }
    function set(key, value) {
      $window.localStorage[key] = value;

    }
    function getObject(key) {
      var object = $window.localStorage[key];

      return object ? JSON.parse(object) : null;
    }
    function setObject(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    }
    function clear() {
      $window.localStorage.clear();
    }
  }
})();
