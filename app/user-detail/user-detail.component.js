'use strict';

angular
  .module('userDetail')
  .component('userDetail', {
    templateUrl: 'user-detail/user-detail.template.html',
    controller: ['UserOperations', '$routeParams',
      function (UserOperations, $routeParams) {
        var self = this;
        self.userId = $routeParams.userId;
        var params =  {
          datetime_from: '2015-01-01T00:00:00 UTC',
          datetime_to: '2017-03-03T00:00:00 UTC'
        };
        self.isLoading = true;
        UserOperations(
          this.userId,
          params,
          function (response) {
            self.isLoading = false;
            self.transactions = response.data;
          },
          function () {
            self.isLoading = false;
          }
        )
      }
    ]
});
