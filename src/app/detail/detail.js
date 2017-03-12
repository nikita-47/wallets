(function () {
    'use strict';

    angular
        .module('app.detail')
        .controller('Detail', Detail);

    /* @ngInject */
    function Detail(dataservice, $stateParams, $state, $injector) {
        /*jshint validthis: true */
        var vm = this;
        var toastr = $injector.get('toastr');

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
            vm.errorsRecharge = [];

            if (!vm.newRecharge.amount) {
                vm.errorsRecharge.push({message: 'Amount is required!'});
            }

            if (!vm.newRecharge.comment) {
                vm.errorsRecharge.push({message: 'Comment is required!'});
            }

            if (vm.errorsRecharge.length > 0) {
                return false;
            }

            vm.isLoadingRecharge = true;

            return dataservice.createRecharge($stateParams.id, vm.newRecharge)
                .then(function (response) {
                    vm.user.balance = response.amount;
                    initRecharge();
                    if (!vm.user.wallet_currency) {
                        activate();
                    }
                })
                .finally(function () {
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
                })
                .finally(function () {
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
                    .then(function (resp) {
                        if (!resp) {
                            $state.go('detail', {id: user.user_id});
                        }
                    })
                    .finally(function () {
                        vm.isLoading = false;
                    });
            } else {
                return dataservice.updateUser(user.user_id, user)
                    .finally(function () {
                        vm.isLoading = false;
                    });
            }
        }

    }

})();
