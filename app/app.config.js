var walletsApp = angular.module('walletsApp', [
  'ui.router',
  'userList',
  'userDetail',
  'templates'
]);

walletsApp
  .config(
    function ($stateProvider,
              $locationProvider,
              $routeProvider,
              $injector
              ) {

      var $templateCache = $injector.get('$templateCache');

      $stateProvider.state('users.list', {
        url: '/users',
        template: $templateCache.get('user-detail/user-detail.template.html'),
        controller: 'userList',
        controllerAs: '$ctrl'
      });

      // $routeProvider.
      //   when('/users', {
      //     template: '<user-list></user-list>'
      //   }).
      //   when('/users/:userId', {
      //     template: '<user-detail></user-detail>'
      //   }).
      //   otherwise('/users');
    }
  );
