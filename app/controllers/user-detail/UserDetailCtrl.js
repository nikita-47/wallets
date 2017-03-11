var userDetailCtrl = angular.module('userDetail', [
    'ui.router',
    'userEdit',
    'userInfo',
    'newRecharge'
]);

userDetailCtrl.controller('UserDetailCtrl', [
    '$stateParams',
    function ($stateParams) {
        var $ctrlDetail = this;
        if ($stateParams.id) {
            $ctrlDetail.id = $stateParams.id;
        }
    }
]);
