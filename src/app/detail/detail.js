(function () {
    'use strict';

    angular
        .module('app.detail')
        .controller('Detail', Detail);

    /* @ngInject */
    function Detail(dataservice, $stateParams, $state) {
        /*jshint validthis: true */
        var vm = this;

        /*jshint camelcase: false */
        vm.user = {
            user_id: '',
            user_name: '',
            user_custom: '',
            email: ''
        };


        if (typeof $stateParams.id !== 'undefined') {
            vm.id = $stateParams.id;
            activate();
        }

        vm.submitUser = submitUser;
        vm.submitRecharge = submitRecharge;

        initRecharge();

        function submitRecharge() {
            vm.isLoadingRecharge = true;
            return dataservice.createRecharge($stateParams.id, vm.newRecharge)
                .then(function (response) {
                    vm.isLoadingRecharge = false;
                    vm.user.balance = response.amount;
                    initRecharge();
                    if (!vm.user.wallet_currency) {
                        activate();
                    }
                });
        }

        function activate() {
            return getUser();
        }

        function initRecharge() {
            vm.newRecharge = {
                amount: '',
                comment: ''
            };
        }

        function getUser() {
            vm.isLoading = true;
            return dataservice.getOneUser($stateParams.id)
                .then(function (response) {
                    vm.isLoading = false;
                    vm.user = response;
                });
        }

        function submitUser(user) {
            vm.errors = [];
            if (user.email.length > 0) {
                if (!emailRegexp.test(user.email)) {
                    vm.errors.push({message: 'Invalid email'});
                }
            }
            if (!user.user_id) {
                vm.errors.push({message: 'ID is required!'});
            }

            if (vm.errors.length > 0) {
                return;
            }

            vm.isLoading = true;
            if (!vm.id) {
                return dataservice.createUser(user)
                    .then(function () {
                        vm.isLoading = false;
                        $state.go('detail', {id: user.user_id});
                    });
            } else {
                return dataservice.updateUser(user.user_id, user)
                    .then(function () {
                        vm.isLoading = false;
                    });
            }
        }

    }

    var emailRegexp = new RegExp(
        [
            '^',
            '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*',
            '|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]',
            '|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")',
            '@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?',
            '|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}',
            '(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:',
            '(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]',
            '|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)',
            '\\])',
            '$'
        ].join('')
    );


})();
