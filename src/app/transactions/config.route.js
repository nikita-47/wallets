(function () {
    'use strict';

    angular
        .module('app.transactions')
        .run(appRun);

    /* @ngInject */
    appRun.$inject = ['statehelper'];
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'transactions',
                config: {
                    url: '/user/transactions?id',
                    templateUrl: 'src/app/transactions/transactions.html',
                    controller: 'Transactions',
                    controllerAs: 'vm'
                }
            }
        ];
    }

})();
