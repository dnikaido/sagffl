(function () {
  'use strict';
  angular.module('facebook', [])
    .factory('Facebook', FacebookService);

  FacebookService.$inject = ['$log', '$q', '$rootScope'];
  function FacebookService($log, $q, $rootScope) {
    $log.debug('loading Facebook');
    var defaultPageId = 'sagffl';

    return {
      getPhotoData: getPhotoData,
      login: login,
      logout: logout
    };

    function getPhotoData(FB, pageId) {
      var deferred = $q.defer();
      var pageId = pageId ? pageId : defaultPageId;
      FB.api('/' + pageId + '/photos',
        {
          fields: 'images'
        },
        function(response) {
          if(response && !response.error) {
            resolve(null, response, deferred);
          } else {
            resolve(response.error, null, deferred);
          }
        });
      return deferred.promise;
    }

    function login(FB) {
      $log.debug('Logging in to Facebook');
      var deferred = $q.defer();
      FB.getLoginStatus(function(response) {
        if(!response || response.error) {
          resolve(response.error, null, deferred);
        }
        else if (response.status == 'connected') {
          $log.debug('Connected to Facebook');
          FB.api('/me', function(response) {
            resolve(null, response, deferred, connected);
          });
        } else {
          FB.login(function(response) {
            if (response.authResponse) {
              $log.debug('Logged in to Facebook');
              FB.api('/me', function(response) {
                resolve(null, response, deferred, connected);
              });
            } else {
              resolve(response.error, null, deferred);
            }
          });
        }
      });
      var promise = deferred.promise;
      return promise;

      function connected(retval) {
        if(retval.error) {
          retval.connected = false;
        } else {
          retval.connected = true;
        }
      }
    }

    function logout(FB) {
      $log.debug('Logging out of Facebook');
      var deferred = $q.defer();
      FB.logout(function(response) {
        if(response && !response.error) {
          resolve(null, response, deferred, disconnected);
        } else {
          resolve(response, null, deferred);
        }
      });
      //resolve(null, {}, deferred, disconnected);

      return deferred.promise;

      function disconnected(retval) {
        retval.connected = false;
      }
    }

    function resolve(errval, retval, deferred, success) {
      $rootScope.$apply(function() {
        if (errval) {
          deferred.reject(errval);
        } else {
          if(success) {
            success(retval);
          }
          deferred.resolve(retval);
        }
      });
    }
  }
})();
