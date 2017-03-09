angular.module('transactionList', [
  'ui.router',
  'core.user'
]);

angular
  .module('transactionList')
  .component('transactionList', {
    templateUrl: 'controllers/transaction-list/TransactionListTemplate.html',
    controllerAs: '$ctrlTransList',
    controller: [
      'UserTransactions',
      '$stateParams',
      function (
        UserTransactions,
        $stateParams) {

        const $ctrlTransList = this;
        $ctrlTransList.userId = $stateParams.id;
        $ctrlTransList.params =  {
          datetime_from: moment().subtract(6, 'days').utc().format(),
          datetime_to: moment().utc().format()
        };

        loadTransactions();

        angular.element(document).ready(function () {
          $('#rangestart').calendar({
            type: 'date',
            monthFirst: true,
            endCalendar: $('#rangeend'),
            firstDayOfWeek: 1,
            onChange: function (date) {
              $ctrlTransList.params.datetime_from = moment(date).utc().format();
            },
          });
          $('#rangeend').calendar({
            type: 'date',
            monthFirst: true,
            firstDayOfWeek: 1,
            startCalendar: $('#rangestart'),
            onChange: function (date) {
              $ctrlTransList.params.datetime_to = moment(date).utc().format();
            },
          });
        });

        $ctrlTransList.reloadTrans = function () {
          loadTransactions();
        };

        function loadTransactions() {
          $ctrlTransList.isLoading = true;
          UserTransactions(
            $ctrlTransList.userId,
            $ctrlTransList.params,
            function (response) {
              $ctrlTransList.isLoading = false;
              $ctrlTransList.transactions = response.data;
            },
            function () {
              $ctrlTransList.isLoading = false;
            }
          );
        }

      }
    ]
});
