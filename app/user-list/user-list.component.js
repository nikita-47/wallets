'use strict';

angular.
  module('userList').
  component('userList', {
    templateUrl: 'user-list/user-list.template.html',
    controller: [
      'User',
      '$location',
      function UserListController(User, $location) {
        var self = this;
        User.query(function (resp) {
          self.users = resp.data;
        });
        self.openUser = function (userId) {
          $location.path('/users/' + userId);
        }
      }
    ]
  });
