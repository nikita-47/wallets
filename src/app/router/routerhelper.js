(function () {
    'use strict';

    angular
        .module('app.router')
        .provider('statehelperConfig', statehelperConfig)
        .factory('statehelper', statehelper);

    statehelper.$inject = [
        '$location',
        '$rootScope',
        '$state',
        'statehelperConfig'
    ];

    // Must configure via the statehelperConfigProvider
    function statehelperConfig() {
        /* jshint validthis:true */
        this.config = {
            // These are the properties we need to set
            // $stateProvider: undefined
            // resolveAlways: {ready: function(){ } }
        };

        this.$get = function () {
            return {
                config: this.config
            };
        };
    }

    function statehelper($location, $rootScope, $state, statehelperConfig) {
        var states = [];
        var $stateProvider = statehelperConfig.config.$stateProvider;
        var $urlRouterProvider = statehelperConfig.config.$urlRouterProvider;

        var service = {
            configureStates: configureStates,
            getStates: getStates
        };

        init();

        return service;

        function configureStates(states) {
            states.forEach(function (state) {
                state.config.resolve =
                    angular.extend(state.config.resolve || {}, statehelperConfig.config.resolveAlways);
                $stateProvider.state(state.state, state.config);
            });
            $urlRouterProvider.otherwise(function () {
                $state.go('user-list');
            });
        }

        function init() {
            handleStateChangeError();
        }

        function handleStateChangeError() {
            $rootScope.$on('$stateChangeError',
                function () {
                    $state.go('user-list');
                }
            );
        }

        function getStates() {
            for (var prop in $state.states) {
                if ($state.states.hasOwnProperty(prop)) {
                    var state = $state.states[prop];
                    states.push(state);
                }
            }
            return states;
        }

    }

})();
