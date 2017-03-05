angular.module('userDetail', [
  'ngRoute', 'core.user'
]);

angular
  .module('userDetail')
  .component('userDetail', {
    templateUrl: 'user-detail/user-detail.template.html',
    controller: ['UserOperations', '$routeParams',
      function (UserOperations, $routeParams) {
        const $ctrl = this;
        $ctrl.userId = $routeParams.userId;
        const params =  {
          datetime_from: '2015-01-01T00:00:00 UTC',
          datetime_to: '2017-03-03T00:00:00 UTC'
        };
        $ctrl.isLoading = true;
        UserOperations(
          this.userId,
          params,
          function (response) {
            $ctrl.isLoading = false;
            $ctrl.transactions = response.data;
          },
          function () {
            $ctrl.isLoading = false;
          }
        )
      }
    ]
});
