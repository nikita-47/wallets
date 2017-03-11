angular.module(
    'core.user',
    ['core-api']
);


angular.module('core.user')
    .factory('Users', [
        'api',
        '$http',
        function (api, $http) {
            return function (params, successCb, errorCb) {
                return api($http).get(
                    '/users',
                    params,
                    successCb,
                    errorCb
                );
            };
        }
    ])
    .factory('OneUser', [
        'api',
        '$http',
        function (api, $http) {
            return function (id, successCb, errorCb) {
                return api($http).get(
                    '/users/' + id,
                    null,
                    successCb,
                    errorCb
                );
            };
        }
    ])
    .factory('UpdateUser', [
        'api',
        '$http',
        function (api, $http) {
            return function (id, params, successCb, errorCb) {
                return api($http).update(
                    '/users/' + id,
                    params,
                    successCb,
                    errorCb
                );
            };
        }
    ])
    .factory('CreateUser', [
        'api',
        '$http',
        function (api, $http) {
            return function (params, successCb, errorCb) {
                return api($http).create(
                    '/users',
                    params,
                    successCb,
                    errorCb
                );
            };
        }
    ])
    .factory('NewRecharge', [
        'api',
        '$http',
        function (api, $http) {
            return function (id, params, successCb, errorCb) {
                return api($http).create(
                    '/users/' + id + '/recharge',
                    params,
                    successCb,
                    errorCb
                );
            };
        }
    ])
    .factory('UserTransactions', [
        'api',
        '$http',
        function (api, $http) {
            return function (id, params, successCb, errorCb) {
                return api($http).get(
                    '/users/' + id + '/transactions',
                    params,
                    successCb,
                    errorCb
                );
            };
        }
    ]);