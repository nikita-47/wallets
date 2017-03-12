(function () {
    'use strict';

    angular
        .module('app.detail')
        .controller('Detail', Detail);

    /* @ngInject */
    function Detail(dataservice, $stateParams, $state, $injector) {
        /*jshint validthis: true */
        var vm = this;

        /*jshint camelcase: false */
        vm.user = {
            user_id: '',
            user_name: '',
            user_custom: '',
            email: ''
        };

        vm.isLoading = false;

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
                    vm.user.balance = response.amount;
                    initRecharge();
                    if (!vm.user.wallet_currency) {
                        activate();
                    }
                    vm.isLoadingRecharge = false;
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
                    vm.user = response;
                    vm.isLoading = false;
                });
        }

        function submitUser(user) {
            vm.errors = [];

            var emailRegexp = $injector.get('emailRegexp');

            if (user.email.length > 0) {
                if (!emailRegexp.test(user.email)) {
                    vm.errors.push({message: 'Invalid email'});
                }
            }
            if (!user.user_id) {
                vm.errors.push({message: 'ID is required!'});
            }

            if (vm.errors.length > 0) {
                return false;
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

})();
