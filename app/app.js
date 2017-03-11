// var walletsApp = angular.module('walletsApp', [
//     'ui.router',
//     'userList',
//     'userTransactions',
//     'userDetail',
//     'templates'
// ]);
//
// walletsApp
//     .config(
//         function ($stateProvider,
//                   $locationProvider,
//                   $urlRouterProvider) {
//
//             $stateProvider.state('user-list', {
//                 url: '/users',
//                 templateUrl: 'users/UserListTemplate.html',
//                 controllerAs: '$ctrlUserList',
//                 controller: 'UserListCtrl'
//             });
//
//             $stateProvider.state('user-detail', {
//                 url: '/user?id',
//                 templateUrl: 'controllers/user-detail/UserDetailTemplate.html',
//                 controllerAs: '$ctrlDetail',
//                 controller: 'UserDetailCtrl'
//             });
//
//             $stateProvider.state('user-transactions', {
//                 url: '/user/transactions?id',
//                 templateUrl: 'controllers/user-transactions/UserTransactionsTemplate.html',
//                 controllerAs: '$ctrlUserTransactions',
//                 controller: 'UserTransactionsCtrl'
//             });
//
//             $urlRouterProvider.otherwise(function ($injector) {
//                 var $state = $injector.get('$state');
//                 $state.go('user-list');
//             });
//         }
//     );
//
// walletsApp.run([
//     '$rootScope',
//     '$location',
//     function ($rootScope, $location) {
//         $rootScope.$on('$locationChangeSuccess', function () {
//             $rootScope.currentUrl = $location.url();
//         });
//     }]
// );
