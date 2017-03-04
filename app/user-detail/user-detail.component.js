'use strict';

angular
  .module('userDetail')
  .component('userDetail', {
    templateUrl: 'user-detail/user-detail.template.html',
    controller: ['$routeParams',
      function UserDetailController($routeParams) {
        this.userId = $routeParams.userId;
      }
    ]
});
