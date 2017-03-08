const userListCtrl = angular.module('userList', ['core.user']);

userListCtrl.controller('UserListCtrl', [
  'Users',
  '$location',
  '$injector',
  function (Users, $location, $injector) {
    const $ctrlUserList = this;
    $ctrlUserList.perPageChoices = [5, 10, 15];
    $ctrlUserList.pages = [];
    $ctrlUserList.pageParams = {
      limit: $ctrlUserList.perPageChoices[0],
      offset: 0
    };

    loadUsers();

    $ctrlUserList.selectPerPage = function (limit) {
      $ctrlUserList.pageParams.offset = 0;
      $ctrlUserList.pageParams.limit = limit;
      loadUsers();
    };

    $ctrlUserList.setPage = function (page) {
      if (!Number.isInteger(page)) {
        return;
      }
      $ctrlUserList.pageParams.offset = page * $ctrlUserList.pageParams.limit;
      loadUsers();
    };

    $ctrlUserList.openUser = function (userId) {
      const $state = $injector.get('$state');
      $state.go('user-detail', {id: userId});
    };

    function pagination(c, m) {
      let current = c,
        last = m,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

      for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || i >= left && i < right) {
          range.push(i);
        }
      }

      for (let i of range) {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1);
          } else if (i - l !== 1) {
            rangeWithDots.push('...');
          }
        }
        rangeWithDots.push(i);
        l = i;
      }

      return rangeWithDots;
    }

    function loadUsers() {
      $ctrlUserList.isLoading = true;
      Users(
        $ctrlUserList.pageParams,
        function (resp) {
          const pageLimit = $ctrlUserList.pageParams.limit;
          const pageOffset = $ctrlUserList.pageParams.offset;

          $ctrlUserList.users = resp.data.data;
          $ctrlUserList.isLoading = false;

          const totalPages = Math.ceil(
            resp.data.recordsTotal / pageLimit
          );

          const currentPage = pageOffset / pageLimit  + 1;

          $ctrlUserList.currentPage = currentPage;

          $ctrlUserList.pages = pagination(
            currentPage,
            totalPages
          );

        }, function () {
          $ctrlUserList.isLoading = false;
        });
    }

  }
]);