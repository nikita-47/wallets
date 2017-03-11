var userTransactionsCtrl = angular.module('userTransactions', [
    'ui.router',
    'transactionList'
]);

userTransactionsCtrl.controller('UserTransactionsCtrl', [
    '$stateParams',
    function ($stateParams) {
        var $ctrlUserTransactions = this;
        $ctrlUserTransactions.id = $stateParams.id;
    }
]);
