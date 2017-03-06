const walletsApp = angular.module('walletsApp', [
  'ui.router',
  'userList',
  'userTransactions',
  'userDetail',
  'templates'
]);

walletsApp
  .config(
    function ($stateProvider,
              $locationProvider,
              $routeProvider) {
      $routeProvider.
        when('/users', {
          template: '<user-list></user-list>'
        }).
        when('/users/transactions/:userId', {
          template: '<user-transactions></user-transactions>'
        }).
        when('/users/create', {
          template: '<user-detail></user-detail>'
        }).
        when('/users/edit/:userId', {
          template: '<user-detail></user-detail>'
        }).
        otherwise('/users');
    }
  );
