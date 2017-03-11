(function() {
    'use strict';

    angular
        .module('app.users')
        .controller('Users', Users);

    /* @ngInject */
    function Users($injector, dataservice) {
        /*jshint validthis: true */
        var vm = this;
        vm.users = [];

        vm.title = 'Users';
        vm.perPageChoices = [5, 10, 15];
        vm.pages = [];
        vm.pageParams = {
            limit: vm.perPageChoices[0],
            offset: 0
        };

        vm.selectPerPage = function (limit) {
            vm.pageParams.offset = 0;
            vm.pageParams.limit = limit;
            activate();
        };

        vm.setPage = function (page) {
            if (!Number.isInteger(page)) {
                return;
            }
            vm.pageParams.offset = page * vm.pageParams.limit;
            activate();
        };

        vm.openUser = function (userId) {
            var $state = $injector.get('$state');
            $state.go('user-detail', {id: userId});
        };
        
        activate();

        function activate() {
            return getUsers();
        }

        function getUsers() {
            return dataservice.getUsers(vm.pageParams).then(function(response) {
                vm.users = response.data;
                return vm.users;
            });
        }
    }
})();

//
//
// var userListCtrl = angular.module('userList', ['core.user']);
//
// userListCtrl.controller('UserListCtrl', [
//     'Users',
//     '$location',
//     '$injector',
//     function (Users, $location, $injector) {
//         var vm = this;
//         vm.perPageChoices = [5, 10, 15];
//         vm.pages = [];
//         vm.pageParams = {
//             limit: vm.perPageChoices[0],
//             offset: 0
//         };
//
//         loadUsers();
//
//         vm.selectPerPage = function (limit) {
//             vm.pageParams.offset = 0;
//             vm.pageParams.limit = limit;
//             loadUsers();
//         };
//
//         vm.setPage = function (page) {
//             if (!Number.isInteger(page)) {
//                 return;
//             }
//             vm.pageParams.offset = page * vm.pageParams.limit;
//             loadUsers();
//         };
//
//         vm.openUser = function (userId) {
//             var $state = $injector.get('$state');
//             $state.go('user-detail', {id: userId});
//         };
//
//         /**
//          *
//          * @param c - current page
//          * @param m - total pages count
//          * @returns {Array}
//          */
//         function pagination(c, m) {
//             var current = c,
//                 last = m,
//                 delta = 2,
//                 left = current - delta,
//                 right = current + delta + 1,
//                 range = [],
//                 rangeWithDots = [],
//                 l;
//
//             for (var i = 1; i <= last; i++) {
//                 if (i === 1 || i === last || i >= left && i < right) {
//                     range.push(i);
//                 }
//             }
//
//             for (var k = range[0]; k <= range.count; k++) {
//                 if (l) {
//                     if (k - l === 2) {
//                         rangeWithDots.push(l + 1);
//                     } else if (k - l !== 1) {
//                         rangeWithDots.push('...');
//                     }
//                 }
//                 rangeWithDots.push(k);
//                 l = k;
//             }
//
//             return rangeWithDots;
//         }
//
//         function loadUsers() {
//             vm.isLoading = true;
//             Users(
//                 vm.pageParams,
//                 function (resp) {
//                     var pageLimit = vm.pageParams.limit;
//                     var pageOffset = vm.pageParams.offset;
//
//                     vm.users = resp.data.data;
//                     vm.isLoading = false;
//
//                     var totalPages = Math.ceil(
//                         resp.data.recordsTotal / pageLimit
//                     );
//
//                     var currentPage = pageOffset / pageLimit + 1;
//
//                     vm.currentPage = currentPage;
//
//                     vm.pages = pagination(
//                         currentPage,
//                         totalPages
//                     );
//
//                 }, function () {
//                     vm.isLoading = false;
//                 });
//         }
//
//     }
// ]);