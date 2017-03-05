angular.module('userList', ['core.user']);
var $injector = angular.injector(['ng']);
var $templateCache = $injector.get('$templateCache');

console.log($templateCache.get('user-detail/user-detail.template.html'));

angular.
  module('userList').
  component('userList', {
    template: $templateCache.get('user-detail/user-detail.template.html'),
    controller: [
      'User',
      '$location',
      '$templateCache',
      function (User, $location, $templateCache) {
        console.log($templateCache.get('user-detail/user-detail.template.html'));
        var self = this;
        var params = {
          limit: 4,
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
