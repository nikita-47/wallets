(function () {
    'use strict';

    angular
        .module('app.transactions')
        .controller('Transactions', Transactions);

    /* @ngInject */
    function Transactions(dataservice, $stateParams, $document, $injector) {
        var vm = this;
        var moment = $injector.get('moment');
        var dateTimeFormat = $injector.get('transDateTimeFormat');

        vm.id = $stateParams.id;
        vm.reloadTrans = reloadTrans;
        activate();

        // Click on refresh button
        function reloadTrans () {
            loadTransactions();
        }

        function activate() {

            // Default params
            vm.params = {
                datetimeFrom: moment()
                    .subtract(7, 'days')
                    .utc(false)
                    .startOf('day'),
                datetimeTo: moment()
                    .utc(false)
                    .endOf('day'),
                transType: null
            };

            vm.types = $injector.get('transTypes');

            angular.element($document).ready(function () {
                initRangePicker();
                $('.dropdown').dropdown();
            });

            loadTransactions();
        }

        // Better to do it in separate directive
        function initRangePicker() {
            var rangeStart = $('#rangeStart');
            var rangeEnd = $('#rangeEnd');

            rangeStart.calendar({
                type: 'date',
                monthFirst: false,
                firstDayOfWeek: 1,
                endCalendar: rangeEnd,
                onChange: function (date) {
                    vm.params.datetimeFrom = moment(date)
                        .utc(true)
                        .startOf('day');
                }
            });

            rangeEnd.calendar({
                type: 'date',
                monthFirst: false,
                firstDayOfWeek: 1,
                startCalendar: rangeStart,
                onChange: function (date) {
                    vm.params.datetimeTo = moment(date)
                        .utc(true)
                        .endOf('day');
                }
            });
        }

        // Start loading transactions
        function loadTransactions() {

            var datetimeTo = vm.params.datetimeTo.format();
            var datetimeFrom = vm.params.datetimeFrom.format();
            var transType = vm.params.transType;

            /*jshint camelcase: false */
            var params = {
                datetime_from: datetimeFrom,
                datetime_to: datetimeTo
            };

            if (transType) {
                params.transaction_type = transType;
            }

            vm.isLoading = true;
            dataservice.getTransactions(vm.id, params)
                .then(
                    function (response) {
                        vm.isLoading = false;
                        var transList = response;
                        if (transList.length) {
                            vm.transactions = transList.map(function (trans) {
                                trans.dateFormated = moment(trans.date)
                                    .utc(false)
                                    .format(dateTimeFormat);
                                return trans;
                            });
                        } else {
                            vm.transactions = [];
                        }
                    }
                );

        }

    }

})();
