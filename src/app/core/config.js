(function () {
    'use strict';

    var core = angular.module('app.core');

    core.value('config', {});
    core.config(configure);

    /* @ngInject */
    function configure($stateProvider,
                       $urlRouterProvider,
                       statehelperConfigProvider) {
        // Configure the common route provider
        statehelperConfigProvider.config.$stateProvider = $stateProvider;
        statehelperConfigProvider.config.$urlRouterProvider = $urlRouterProvider;
        var resolveAlways = {
            /* @ngInject */
            ready: function (dataservice) {
                return dataservice.ready();
            }
        };
        statehelperConfigProvider.config.resolveAlways = resolveAlways;
    }

})();
