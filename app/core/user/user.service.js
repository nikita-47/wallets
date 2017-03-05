angular.module(
  'core.user',
  ['core-api']
);


angular.module('core.user')
  .factory('User', [
    'api',
    '$http',
    function (api, $http) {
      return function (params, successCb = null, errorCb = null) {
        return api($http).getList(
          '/users',
          params,
          successCb,
          errorCb
        );
      }
    }
  ])
  .factory('UserOperations', [
    'api',
    '$http',
    function (api, $http) {
      return function (id, params, successCb = null, errorCb = null) {
        return api($http).getList(
          '/users/' + id + '/transactions',
          params,
          successCb,
          errorCb
        );
      };
    }
  ]);