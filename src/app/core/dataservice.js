(function () {
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
            getTransactions: getTransactions,
            ready: ready
        };

        return service;


        /**
         * Get all users
         * @param params ({ offset, limit })
         * @return {promise}
         */
        function getUsers(params) {
            var paramsString = prepareParams(params);
            return $http.get(baseUrl + '/users' + paramsString)
                .then(getUsersComplete);

            function getUsersComplete(data, status, headers, config) {
                return data.data;
            }
        }


        /**
         * Get one users
         * @param id user Id
         * @return {promise}
         */
        function getOneUser(id) {
            return $http.get(baseUrl + '/users/' + id)
                .then(getOneUserComplete);

            function getOneUserComplete(data, status, headers, config) {
                return data.data;
            }
        }


        /**
         * Create new user
         * @param data
         * @return {promise}
         */
        function createUser(data) {
            return $http.post(baseUrl + '/users', data)
                .then(createComplete);

            function createComplete(data, status, headers, config) {
                return data.data;
            }
        }


        /**
         * Update user info
         * @param id
         * @param data
         * @return {promise}
         */
        function updateUser(id, data) {
            return $http.put(baseUrl + '/users/' + id, data)
                .then(updateComplete);

            function updateComplete(data, status, headers, config) {
                return data.data;
            }
        }

        /**
         * Create Recharge
         * @param id user
         * @param data ({ amount, comment })
         * @return {promise}
         */
        function createRecharge(id, data) {
            return $http.post(baseUrl + '/users/' + id + '/recharge', data)
                .then(rechargeComplete);

            function rechargeComplete(data, status, headers, config) {
                return data.data;
            }
        }


        /**
         * Get all transaction for user
         * @param id user
         * @param params ({ datetime_from, datetime_to, transaction_type })
         * @return {promise}
         */
        function getTransactions(id, params) {
            var paramsString = prepareParams(params);
            var url = baseUrl + '/users/' + id + '/transactions' + paramsString;
            return $http.get(url)
                .then(getTransactionsComplete);

            function getTransactionsComplete(data, status, headers, config) {
                return data.data;
            }
        }


        /**
         * Prepare params for GET
         * @param params
         * @return {string}
         */
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


        /**
         * Check ready
         * @param nextPromises
         * @return {promise}
         */
        function ready(nextPromises) {
            var readyPromise = primePromise || prime();

            return readyPromise
                .then(function () {
                    return $q.all(nextPromises);
                });
            //    .catch(exception.catcher('"ready" function failed'));
        }


        function prime() {
            primePromise = $q.when(true).then(success);
            return primePromise;

            function success() {
                isPrimed = true;
            }
        }

    }
})();
