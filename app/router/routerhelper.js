(function() {
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
            // docTitle: ''
            // resolveAlways: {ready: function(){ } }
        };

        this.$get = function() {
            return {
                config: this.config
            };
        };
    }

    function statehelper($location, $rootScope, $state, statehelperConfig) {
        var handlingRouteChangeError = false;
        var states = [];
        var $stateProvider = statehelperConfig.config.$stateProvider;
        var $urlRouterProvider = statehelperConfig.config.$urlRouterProvider;

        var service = {
            configureStates: configureStates,
            getStates: getStates
        };

        init();

        return service;
        ///////////////

        function configureStates(states) {
            states.forEach(function(state) {
                state.config.resolve =
                    angular.extend(state.config.resolve || {}, statehelperConfig.config.resolveAlways);
                $stateProvider.state(state.state, state.config);
            });
            $urlRouterProvider.otherwise(function ($injector) {
                var $state = $injector.get('$state');
                $state.go('user-list');
            });
        }

        function handleRoutingErrors() {
            // Route cancellation:
            // On routing error, go to the dashboard.
            // Provide an exit clause if it tries to do it twice.
            $rootScope.$on('$stateChangeError',
                function() {
                    if (handlingRouteChangeError) {
                        return;
                    }
                    handlingRouteChangeError = true;
                    $location.path('/users');
                }
            );
        }

        function init() {
            handleRoutingErrors();
            updateDocTitle();
        }

        function getStates() {
            for (var prop in $state.states) {
                if ($state.states.hasOwnProperty(prop)) {
                    var state = $state.states[prop];
                    var isRoute = !!state.title;
                    if (isRoute) {
                        states.push(state);
                    }
                }
            }
            return states;
        }

        function updateDocTitle() {
            $rootScope.$on('$routeChangeSuccess',
                function(event, current) {
                    handlingRouteChangeError = false;
                    var title = statehelperConfig.config.docTitle + ' ' + (current.title || '');
                    $rootScope.title = title; // data bind to <title>
                }
            );
        }
    }
})();
