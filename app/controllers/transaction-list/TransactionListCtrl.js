angular.module('transactionList', [
    'ui.router',
    'core.user'
]);
/*jshint camelcase: true */
angular
    .module('transactionList')
    .component('transactionList', {
        templateUrl: 'controllers/transaction-list/TransactionListTemplate.html',
        controllerAs: '$ctrlTransList',
        controller: [
            'UserTransactions',
            '$stateParams',
            '$document',
            '$injector',
            function (UserTransactions,
                      $stateParams,
                      $document,
                      $injector) {

                var moment = $injector.get('moment');
                var dateTimeFormat = $injector.get('transDateTimeFormat');

                var $ctrlTransList = this;
                $ctrlTransList.userId = $stateParams.id;
                $ctrlTransList.params = {
                    dateTimeFrom: moment().subtract(7, 'days').startOf('day').utc(false),
                    dateTimeTo: moment().endOf('day').utc(false),
                    transType: null
                };

                $ctrlTransList.types = [
                    {
                        name: 'No selection'
                    },
                    {
                        value: 'payment',
                        name: 'Payment'
                    },
                    {
                        value: 'coupon',
                        name: 'Coupon'
                    },
                    {
                        value: 'inGamePurchase',
                        name: 'In game purchase'
                    },
                    {
                        value: 'internal',
                        name: 'Internal'
                    },
                    {
                        value: 'cancellation',
                        name: 'Cancellation'
                    }
                ];

                loadTransactions();

                // Initialize range picker
                angular.element($document).ready(function () {

                    var rangeStart = $('#rangeStart');
                    var rangeEnd = $('#rangeEnd');

                    rangeStart.calendar({
                        type: 'date',
                        monthFirst: false,
                        firstDayOfWeek: 1,
                        endCalendar: rangeEnd,
                        onChange: function (date) {
                            $ctrlTransList.params.dateTimeFrom = moment(date)
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
                            $ctrlTransList.params.dateTimeTo = moment(date)
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

                    var datetimeTo = $ctrlTransList.params.dateTimeTo.format();
                    var datetimeFrom = $ctrlTransList.params.dateTimeFrom.format();
                    var transType = $ctrlTransList.params.transType;

                    /*jshint camelcase: false */
                    var params = {
                        datetime_from: datetimeFrom,
                        datetime_to: datetimeTo
                    };

                    if (transType) {
                        params.transaction_type = transType;
                    }

                    $ctrlTransList.isLoading = true;
                    UserTransactions(
                        $ctrlTransList.userId,
                        params,
                        function (response) {
                            $ctrlTransList.isLoading = false;
                            var transList = response.data;
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
