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
      '$injector',
      function (
        UserTransactions,
        $stateParams,
        $injector) {

        const dateTimeFormat = $injector.get('appConfig').transDateTimeFormat;

        const $ctrlTransList = this;
        $ctrlTransList.userId = $stateParams.id;
        $ctrlTransList.params =  {
          datetime_from: moment().subtract(7, 'days').startOf('day').utc(false),
          datetime_to: moment().endOf('day').utc(false),
          trans_type: null
        };

        $ctrlTransList.types = [
          {
            name: "No selection"
          },
          {
            value: "payment",
            name: "Payment"
          },
          {
            value: "coupon",
            name: "Coupon"
          },
          {
            value: "inGamePurchase",
            name: "In game purchase"
          },
          {
            value: "internal",
            name: "Internal"
          },
          {
            value: "cancellation",
            name: "Cancellation"
          }
        ];

        loadTransactions();

        // Initialize range picker
        angular.element(document).ready(function () {

          let rangeStart = $('#rangeStart');
          let rangeEnd = $('#rangeEnd');

          rangeStart.calendar({
            type: 'date',
            monthFirst: false,
            firstDayOfWeek: 1,
            endCalendar: rangeEnd,
            onChange: function (date) {
              $ctrlTransList.params.datetime_from = moment(date)
                .startOf('day')
                .utc(false);
            },
          });

          rangeEnd.calendar({
            type: 'date',
            monthFirst: false,
            firstDayOfWeek: 1,
            startCalendar: rangeStart,
            onChange: function (date) {
              $ctrlTransList.params.datetime_to = moment(date)
                .endOf('day')
                .utc(false);
            },
          });

          $('.dropdown').dropdown();

        });

        // Click on refresh button
        $ctrlTransList.reloadTrans = function () {
          loadTransactions();
        };

        // Start loading transactions
        function loadTransactions() {

          const datetime_to = $ctrlTransList.params.datetime_to.format();
          const datetime_from = $ctrlTransList.params.datetime_from.format();
          const trans_type = $ctrlTransList.params.trans_type;

          const params = {
            datetime_from,
            datetime_to
          };

          if (trans_type) {
            params.transaction_type = trans_type;
          }

          $ctrlTransList.isLoading = true;
          UserTransactions(
            $ctrlTransList.userId,
            params,
            function (response) {
              $ctrlTransList.isLoading = false;
              let transList = response.data;
              if (transList.length) {
                $ctrlTransList.transactions = transList.map(function (trans) {
                  trans.dateFormated = moment(trans.date)
                    .utc(false)
                    .format(dateTimeFormat);
                  return trans;
                });
              } else {
                $ctrlTransList.transactions = [];
              }
            },
            function () {
              $ctrlTransList.isLoading = false;
            }
          );
        }

      }

    ]

});
