(function () {
    'use strict';

    angular
        .module('app.users')
        .controller('Users', Users);

    /* @ngInject */
    function Users($injector, dataservice) {
        /*jshint validthis: true */
        var vm = this;

        vm.users = [];
        vm.perPageChoices = [5, 10, 15];
        vm.pages = [];
        vm.pageParams = {
            limit: vm.perPageChoices[0],
            offset: 0
        };

        vm.selectPerPage = selectPerPage;
        vm.setPage = setPage;
        vm.openUser = openUser;

        activate();

        function openUser(userId) {
            var $state = $injector.get('$state');
            $state.go('detail', { id: userId });
        }

        function selectPerPage(limit) {
            vm.pageParams.offset = 0;
            vm.pageParams.limit = limit;
            activate();
        }

        function setPage(page) {
            if (!Number.isInteger(page)) {
                return;
            }
            vm.pageParams.offset = page * vm.pageParams.limit;
            activate();
        }

        function activate() {
            return getUsers();
        }

        function getUsers() {
            vm.isLoading = true;
            return dataservice.getUsers(vm.pageParams)
                .then(function (response) {
                    vm.users = response.data;
                    vm.isLoading = false;

                    var totalPages = Math.ceil(
                        response.recordsTotal / vm.pageParams.limit
                    );
                    var currentPage = vm.pageParams.offset / vm.pageParams.limit + 1;

                    vm.currentPage = currentPage;
                    vm.pages = pagination(
                        totalPages,
                        currentPage
                    );
                    return vm.users;
                });
        }

        /**
         * Return pagination array (example : [1, 2, '...', n])
         * @param last - pages total
         * @param current - current page number
         * @returns {Array}
         */
        function pagination(last, current) {
            var delta = 2,
                left = current - delta,
                right = current + delta + 1,
                range = [],
                rangeWithDots = [],
                l;

            for (var i = 1; i <= last; i++) {
                if (i === 1 || i === last || i >= left && i < right) {
                    range.push(i);
                }
            }

            range.forEach(function (k) {
                if (l) {
                    if (k - l === 2) {
                        rangeWithDots.push(l + 1);
                    } else if (k - l !== 1) {
                        rangeWithDots.push('...');
                    }
                }
                rangeWithDots.push(k);
                l = k;
            });

            return rangeWithDots;
        }

    }
})();
