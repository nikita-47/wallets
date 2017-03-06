const userTransactionsCtrl = angular.module('userTransactions', [
  'ui.router',
  'transactionList'
]);

userTransactionsCtrl.controller('UserTransactionsCtrl', [
  '$stateParams',
  function ($stateParams) {
    const $ctrlUserTransactions = this;
    $ctrlUserTransactions.id = $stateParams.id;
  }
]);
