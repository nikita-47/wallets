const walletsApp = angular.module('walletsApp', [
  'ui.router',
  'userList',
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
        when('/users/:userId', {
          template: '<user-detail></user-detail>'
        }).
        otherwise('/users');
    }
  );
