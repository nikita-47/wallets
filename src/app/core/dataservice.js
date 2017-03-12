(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    /* @ngInject */
    function dataservice($http, $q, $injector) {
        var baseUrl = $injector.get('baseUrl');
        var toastr = $injector.get('toastr');
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
         * @return {promise | object}
         */
        function getUsers(params) {
            var paramsString = prepareParams(params);
            return $http.get(baseUrl + '/users' + paramsString)
                .then(getUsersComplete)
                .catch(exceptionCatcher);

            function getUsersComplete(data) {
                return data.data;
            }
        }


        /**
         * Get one users
         * @param id user Id
         * @return {promise | object}
         */
        function getOneUser(id) {
            return $http.get(baseUrl + '/users/' + id)
                .then(getOneUserComplete)
                .catch(exceptionCatcher);

            function getOneUserComplete(data) {
                return data.data;
            }
        }


        /**
         * Create new user
         * @param data
         * @return {promise | object}
         */
        function createUser(data) {
            return $http.post(baseUrl + '/users', data)
                .then(createComplete)
                .catch(exceptionCatcher);

            function createComplete(data) {
                if (data.data) {
                    /*jshint camelcase: false */
                    if (data.data.http_status_code) {
                        toastr.error(data.data.message);
                    }
                }
                return data.data;
            }
        }


        /**
         * Update user info
         * @param id
         * @param data
         * @return {promise | object}
         */
        function updateUser(id, data) {
            return $http.put(baseUrl + '/users/' + id, data)
                .then(updateComplete)
                .catch(exceptionCatcher);

            function updateComplete(data) {
                return data.data;
            }
        }

        /**
         * Create Recharge
         * @param id user
         * @param data ({ amount, comment })
         * @return {promise | object}
         */
        function createRecharge(id, data) {
            return $http.post(baseUrl + '/users/' + id + '/recharge', data)
                .then(rechargeComplete)
                .catch(exceptionCatcher);

            function rechargeComplete(data) {
                return data.data;
            }
        }


        /**
         * Get all transaction for user
         * @param id user
         * @param params ({ datetime_from, datetime_to, transaction_type })
         * @return {promise | object}
         */
        function getTransactions(id, params) {
            var paramsString = prepareParams(params);
            var url = baseUrl + '/users/' + id + '/transactions' + paramsString;
            return $http.get(url)
                .then(getTransactionsComplete)
                .catch(exceptionCatcher);

            function getTransactionsComplete(data) {
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
                })
                .catch(exceptionCatcher);
        }


        function prime() {
            primePromise = $q.when(true).then(success);
            return primePromise;

            function success() {
                isPrimed = true;
            }
        }


        function exceptionCatcher() {
            toastr.error('Sorry, but something went wrong');
        }

    }
})();
