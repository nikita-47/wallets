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
  .factory('CreateUser', [
    'api',
    '$http',
    function (api, $http) {
      return function (params, successCb = null, errorCb = null) {
        return api($http).create(
          '/users',
          params,
          successCb,
          errorCb
        );
      }
    }
  ])
  .factory('UserTransactions', [
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