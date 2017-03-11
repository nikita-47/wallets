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
        //
        // function getAvengerCount() {
        //     var count = 0;
        //     return getAvengersCast()
        //         .then(getAvengersCastComplete);
        //     //    .catch(exception.catcher('XHR Failed for getAvengerCount'));
        //
        //     function getAvengersCastComplete (data) {
        //         count = data.length;
        //         return $q.when(count);
        //     }
        // }
        //
        // function getAvengersCast() {
        //     var cast = [
        //         {name: 'Robert Downey Jr.', character: 'Tony Stark / Iron Man'},
        //         {name: 'Chris Hemsworth', character: 'Thor'},
        //         {name: 'Chris Evans', character: 'Steve Rogers / Captain America'},
        //         {name: 'Mark Ruffalo', character: 'Bruce Banner / The Hulk'},
        //         {name: 'Scarlett Johansson', character: 'Natasha Romanoff / Black Widow'},
        //         {name: 'Jeremy Renner', character: 'Clint Barton / Hawkeye'},
        //         {name: 'Gwyneth Paltrow', character: 'Pepper Potts'},
        //         {name: 'Samuel L. Jackson', character: 'Nick Fury'},
        //         {name: 'Paul Bettany', character: 'Jarvis'},
        //         {name: 'Tom Hiddleston', character: 'Loki'},
        //         {name: 'Clark Gregg', character: 'Agent Phil Coulson'}
        //     ];
        //     return $q.when(cast);
        // }
        //
        function prime() {
            // This function can only be called once.
            if (primePromise) {
                return primePromise;
            }

            primePromise = $q.when(true).then(success);
            return primePromise;

            function success() {
                isPrimed = true;
            //    logger.info('Primed data');
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
