angular.module('newRecharge', [
    'ui.router',
    'core.user'
]);

angular
    .module('newRecharge')
    .component('newRecharge', {
        templateUrl: 'controllers/new-recharge/NewRechargeTemplate.html',
        controllerAs: '$ctrlNewRecharge',
        controller: [
            'NewRecharge',
            '$rootScope',
            '$stateParams',
            function (NewRecharge,
                      $rootScope,
                      $stateParams) {

                var $ctrlNewRecharge = this;

                $ctrlNewRecharge.userId = $stateParams.id;
                $ctrlNewRecharge.newRecharge = {
                    amount: '',
                    comment: ''
                };

                $ctrlNewRecharge.submitRecharge = function () {
                    $ctrlNewRecharge.errors = [];

                    if (!$ctrlNewRecharge.newRecharge.comment) {
                        $ctrlNewRecharge
                            .errors
                            .push({message: 'Comment should not be blank'});
                        return;
                    }

                    if ($ctrlNewRecharge.errors.length > 0) {
                        return;
                    }

                    $ctrlNewRecharge.isLoading = true;

                    NewRecharge(
                        $ctrlNewRecharge.userId,
                        $ctrlNewRecharge.newRecharge,
                        function (response) {
                            $ctrlNewRecharge.isLoading = false;
                            if (response.data) {
                                if (!response.data.amount) {
                                    $ctrlNewRecharge.errors.push(
                                        {message: response.data.message}
                                    );
                                } else {
                                    $rootScope.$broadcast('newRecharge', {});
                                    $ctrlNewRecharge.newRecharge = {
                                        amount: '',
                                        comment: ''
                                    };
                                }
                            }
                        },
                        function (error) {
                            $ctrlNewRecharge.errors.push({message: error.message});
                            $ctrlNewRecharge.isLoading = false;
                        }
                    );

                };

            }
        ]
    });
