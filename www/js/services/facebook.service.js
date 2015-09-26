(function () {
  'use strict';
  angular.module('facebook', [
      'ngCordova'
    ])
    .factory('Facebook', FacebookService);

  FacebookService.$inject = ['$log', '$q', '$rootScope', '$cordovaOauth', 'Config'];
  function FacebookService($log, $q, $rootScope, $cordovaOauth, Config) {
    $log.debug('loading Facebook');
    var defaultPageId = Config.FACEBOOK_PAGE_ID;

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
          setUserInfo(FB, deferred);
        } else {
          $cordovaOauth.facebook('400628200140143', ["public_profile"])
            .then(function(response) {
              if (response.access_token) {
                $log.debug('Logged in to Facebook');
                FB.getLoginStatus(function(response) {
                  if(!response || response.error) {
                    resolve(response.error, null, deferred);
                  }
                  else if (response.status == 'connected') {
                    $log.debug('Connected to Facebook');
                    setUserInfo(FB, deferred);
                  } else {
                    $log.debug('Crazy error trying to connect to Facebook');
                    resolve('Could not connect to Facebook', null, deferred);
                  }
                }, true);
              } else {
                resolve(response.error, null, deferred);
              }
            })
            .catch(function(error) {
              resolve(error, null, deferred);
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

      function setUserInfo(FB, deferred) {
        FB.api('/me', function(response) {
          if(!response || response.error) {
            resolve(response.error, null, deferred);
          } else {
            resolve(null, response, deferred, connected);
          }
        });
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
