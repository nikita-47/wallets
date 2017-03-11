angular.module('userInfo', [
    'ui.router',
    'core.user'
]);

angular
    .module('userInfo')
    .component('userInfo', {
        templateUrl: 'controllers/user-info/UserInfoTemplate.html',
        controllerAs: '$ctrlInfo',
        controller: [
            'OneUser',
            '$rootScope',
            '$stateParams',
            function (OneUser,
                      $rootScope,
                      $stateParams) {

                var $ctrlInfo = this;

                $ctrlInfo.user = {};

                $ctrlInfo.userId = $stateParams.id;
                loadUser();

                $rootScope.$on('newRecharge', function () {
                    loadUser();
                });

                function loadUser() {
                    $ctrlInfo.isLoading = true;
                    OneUser(
                        $ctrlInfo.userId,
                        function (response) {
                            $ctrlInfo.user = response.data;
                            $ctrlInfo.isLoading = false;
                        },
                        function () {
                            $ctrlInfo.isLoading = false;
                        }
                    );
                }

            }
        ]
    });
