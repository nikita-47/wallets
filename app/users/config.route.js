(function () {
    'use strict';

    angular
        .module('app.users')
        .run(appRun);

    /* @ngInject */
    appRun.$inject = ['statehelper'];
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                url: '/users',
                state: 'user-list',
                config: {
                    templateUrl: 'app/users/users.html',
                    controller: 'Users',
                    controllerAs: 'vm'
                }
            }
        ];
    }

})();
