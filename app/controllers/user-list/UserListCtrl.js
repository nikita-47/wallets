const userListCtrl = angular.module('userList', ['core.user']);

userListCtrl.controller('UserListCtrl', [
  'Users',
  '$location',
  '$injector',
  function (Users, $location, $injector) {
    const $ctrlUserList = this;
    $ctrlUserList.perPageChoices = [5, 10, 15];
    $ctrlUserList.pages = 0;
    $ctrlUserList.paginationsParams = {
      limit: $ctrlUserList.perPageChoices[0],
      offset: 0
    };

    loadUsers();

    $ctrlUserList.selectPerPage = function (limit) {
      $ctrlUserList.paginationsParams.offset = 0;
      $ctrlUserList.paginationsParams.limit = limit;
      loadUsers();
    };

    $ctrlUserList.setPage = function (page) {
      $ctrlUserList.paginationsParams.offset = page;
      loadUsers();
    };

    $ctrlUserList.openUser = function (userId) {
      const $state = $injector.get('$state');
      $state.go('user-detail', { id: userId });
    };

    $ctrlUserList.getPages = function () {
      return new Array($ctrlUserList.pages);
    };

    function loadUsers() {
      $ctrlUserList.isLoading = true;
      Users(
        $ctrlUserList.paginationsParams,
        function (resp) {
          $ctrlUserList.users = resp.data.data;
          $ctrlUserList.isLoading = false;
          $ctrlUserList.pages = Math.ceil(
            resp.data.recordsTotal / $ctrlUserList.paginationsParams.limit
          );
        }, function () {
          $ctrlUserList.isLoading = false;
        });
    }
  }
]);
