(function () {
  'use strict';
  angular.module('mock.state',[])
    .factory('StateMock', StateMock);

  StateMock.$inject = ['$q'];
  function StateMock($q) {
    var service = this;

    service.expectedTransitions = [];
    service.current = {};
    service.go = transitionTo;
    service.expectTransitionTo = expectTransitionTo;
    service.ensureAllTransitionsHappened = ensureAllTransitionsHappened;

    return service;

    function ensureAllTransitionsHappened(){
      if(service.expectedTransitions.length > 0){
        throw Error('Not all transitions happened!');
      }
    }

    function expectTransitionTo(stateName){
      service.expectedTransitions.push(stateName);
    }

    function transitionTo(stateName){
      if(service.expectedTransitions.length > 0){
        var expectedState = service.expectedTransitions.shift();
        if(expectedState !== stateName){
          throw Error('Expected transition to state: ' + expectedState + ' but transitioned to ' + stateName );
        }
      }else{
        throw Error('No more transitions were expected! Tried to transition to '+ stateName );
      }
      service.current.name = stateName;
      var deferred = $q.defer();
      var promise = deferred.promise;
      deferred.resolve();
      return promise;
    }
  }
})();
