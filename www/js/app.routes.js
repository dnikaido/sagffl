(function() {
  'use strict';
  angular.module('starter')
    .config(configureRoutes);

  configureRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];
  function configureRoutes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('home', {
        url:          '/',
        templateUrl:  'templates/home/home.html',
        controller:   'HomeController as vm'
      });
  }
})();
