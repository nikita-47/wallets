angular.module('userList', ['core.user']);

angular.
  module('userList').
  component('userList', {
    templateUrl: 'user-list/user-list.template.html',
    controller: [
      'User',
      '$location',
      function (User, $location) {
        const self = this;
        const params = {
          limit: 2,
          offset: 0
        };
        self.isLoading = true;
        User(
          params,
          function (resp) {
            self.users = resp.data.data;
            self.isLoading = false;
          }, function () {
            self.isLoading = false;
          });
        self.openUser = function (userId) {
          $location.path('/users/' + userId);
        }
      }
    ]
  });
