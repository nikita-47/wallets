angular.module('userTransactions', [
  'ngRoute', 'core.user'
]);

angular
  .module('userTransactions')
  .component('userTransactions', {
    templateUrl: 'controllers/user-transactions//UserTransactionsCtrl.html',
    controller: ['UserTransactions', '$routeParams', '$location',
      function (UserTransactions, $routeParams, $location) {
        const $ctrl = this;
        $ctrl.userId = $routeParams.userId;
        const params =  {
          datetime_from: '2015-01-01T00:00:00 UTC',
          datetime_to: '2017-03-03T00:00:00 UTC'
        };
        $ctrl.isLoading = true;
        UserTransactions(
          $ctrl.userId,
          params,
          function (response) {
            $ctrl.isLoading = false;
            $ctrl.transactions = response.data;
          },
          function () {
            $ctrl.isLoading = false;
          }
        );

        $ctrl.backToProfile = function () {
          $location.path('/users/edit/' + $ctrl.userId);
        };
      }
    ]
});
