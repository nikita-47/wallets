angular.module('transactionList', [
  'ui.router',
  'core.user'
]);

angular
  .module('transactionList')
  .component('transactionList', {
    templateUrl: 'controllers/transaction-list/TransactionListTemplate.html',
    controllerAs: '$ctrlTransactionList',
    controller: [
      'UserTransactions',
      '$stateParams',
      function (
        UserTransactions,
        $stateParams) {

        const $ctrlTransactionList = this;
        $ctrlTransactionList.userId = $stateParams.id;
        const params =  {
          datetime_from: '2015-01-01T00:00:00 UTC',
          datetime_to: '2017-03-03T00:00:00 UTC'
        };
        $ctrlTransactionList.isLoading = true;
        UserTransactions(
          $ctrlTransactionList.userId,
          params,
          function (response) {
            $ctrlTransactionList.isLoading = false;
            $ctrlTransactionList.transactions = response.data;
          },
          function () {
            $ctrlTransactionList.isLoading = false;
          }
        );

        $('#rangestart').calendar({
          type: 'date',
          endCalendar: $('#rangeend')
        });
        $('#rangeend').calendar({
          type: 'date',
          startCalendar: $('#rangestart')
        });

      }
    ]
});
