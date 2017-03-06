angular.module('userList', ['core.user']);

angular.
  module('userList').
  component('userList', {
    templateUrl: 'user-list/user-list.template.html',
    controllerAs: '$ctrl',
    controller: [
      'Users',
      '$location',
      function (Users, $location) {
        const $ctrl = this;
        $ctrl.perPageChoices = [5, 10, 15];

        $ctrl.paginationsParams = {
          limit: $ctrl.perPageChoices[0],
          offset: 0
        };

        $ctrl.pages = 0;

        loadUsers();

        $ctrl.selectPerPage = function (limit) {
          $ctrl.paginationsParams.offset = 0;
          $ctrl.paginationsParams.limit = limit;
          loadUsers();
        };

        $ctrl.setPage = function (page) {
          $ctrl.paginationsParams.offset = page;
          loadUsers();
        };

        $ctrl.openUser = function (userId) {
          $location.path('/users/edit/' + userId);
        };

        $ctrl.createNewUser = function () {
          $location.path('/users/create');
        };

        $ctrl.getPages = function() {
          return new Array($ctrl.pages);
        };

        function loadUsers() {
          $ctrl.isLoading = true;
          Users(
            $ctrl.paginationsParams,
            function (resp) {
              $ctrl.users = resp.data.data;
              $ctrl.isLoading = false;
              $ctrl.pages = Math.ceil(
                resp.data.recordsTotal / $ctrl.paginationsParams.limit
              );
            }, function () {
              $ctrl.isLoading = false;
            });
        }
      }
    ]
  });
