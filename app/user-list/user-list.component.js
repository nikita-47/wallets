'use strict';

angular.
  module('userList').
  component('userList', {
    templateUrl: 'user-list/user-list.template.html',
    controller: [
      '$http',
      '$location',
      function UserListController($http, $location) {
        var self = this;
        $http.get('https://livedemo.xsolla.com/fe/test-task/baev/users?offset=0&limit=5').then(function (response) {
            self.users = response.data.data;
        });

        self.openUser = function (userId) {
          $location.path('/users/' + userId);
        }
      }
    ]
  });
