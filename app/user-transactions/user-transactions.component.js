angular.module('userTransactions', [
  'ngRoute', 'core.user'
]);

angular
  .module('userTransactions')
  .component('userTransactions', {
    templateUrl: 'user-transactions/user-transactions.template.html',
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
          this.userId,
          params,
          function (response) {
            $ctrl.isLoading = false;
            $ctrl.transactions = response.data;
          },
          function () {
            $ctrl.isLoading = false;
          }
        );

        $ctrl.backToAll = function () {
          $location.path('/users');
        }
      }
    ]
});
