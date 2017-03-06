const userDetailCtrl = angular.module('userDetail', [
  'ui.router',
  'userEdit',
  'newRecharge'
]);

userDetailCtrl.controller('UserDetailCtrl', [
  '$stateParams',
  function ($stateParams) {
    const $ctrlDetail = this;
    if ($stateParams.id) {
      $ctrlDetail.id = $stateParams.id;
    }
  }
]);
