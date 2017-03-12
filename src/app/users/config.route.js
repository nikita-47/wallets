(function () {
    'use strict';

    angular
        .module('app.users')
        .run(appRun);

    /* @ngInject */
    appRun.$inject = ['statehelper'];
    function appRun(statehelper) {
        statehelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'user-list',
                config: {
                    url: '/users',
                    templateUrl: 'src/app/users/users.html',
                    controller: 'Users',
                    controllerAs: 'vm'
                }
            }
        ];
    }


})();
