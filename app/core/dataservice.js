(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    /* @ngInject */
    function dataservice($http, $q, $injector) {
        var baseUrl = $injector.get('baseUrl');
        var isPrimed = false;
        var primePromise;

        var service = {
            getUsers: getUsers,
            getOneUser: getOneUser,
            createUser: createUser,
            updateUser: updateUser,
            createRecharge: createRecharge,
            ready: ready
        };

        return service;
        //
        function getUsers(params) {
            var paramsString = prepareParams(params);
            return $http.get(baseUrl + '/users' + paramsString)
                .then(getUsersComplete);

            function getUsersComplete(data, status, headers, config) {
                return data.data;
            }
        }

        //
        function getOneUser(id) {
            return $http.get(baseUrl + '/users/' + id)
                .then(getOneUserComplete);

            function getOneUserComplete(data, status, headers, config) {
                return data.data;
            }
        }

        //
        function createUser(data) {
            return $http.post(baseUrl + '/users', data)
                .then(createComplete);

            function createComplete(data, status, headers, config) {
                return data.data;
            }
        }

        //
        function createRecharge(id, data) {
            return $http.post(baseUrl + '/users/' + id + '/recharge', data)
                .then(rechargeComplete);

            function rechargeComplete(data, status, headers, config) {
                return data.data;
            }
        }

        //
        function updateUser(id, data) {
            return $http.put(baseUrl + '/users/' + id, data)
                .then(updateComplete);

            function updateComplete(data, status, headers, config) {
                return data.data;
            }
        }

        //
        function prepareParams(params) {
            var paramsString;
            if (params) {
                paramsString = '?';
                for (var key in params) {
                    if (params.hasOwnProperty(key)) {
                        paramsString += key + '=' + params[key] + '&';
                    }
                }
                paramsString = paramsString.slice(0, -1);
            }
            return paramsString;
        }


        function prime() {
            // This function can only be called once.
            if (primePromise) {
                return primePromise;
            }

            primePromise = $q.when(true).then(success);
            return primePromise;

            function success() {
                isPrimed = true;
            }
        }
        //
        function ready(nextPromises) {
            var readyPromise = primePromise || prime();

            return readyPromise
                .then(function() { return $q.all(nextPromises); });
            //    .catch(exception.catcher('"ready" function failed'));
        }

    }
})();
