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
      '$stateParams',
      function (
        NewRecharge,
        $stateParams) {
        const $ctrlNewRecharge = this;

        $ctrlNewRecharge.userId = $stateParams.id;
        $ctrlNewRecharge.newTransaction = {
          amount: '',
          comment: ''
        };

        $ctrlNewRecharge.submitRecharge = function (newRecharge) {
          $ctrlNewRecharge.errors = [];

          if ($ctrlNewRecharge.errors.length > 0) {
            return;
          }

          $ctrlNewRecharge.isLoading = true;

          NewRecharge(
            $ctrlNewRecharge.userId,
            newRecharge,
            function (response) {
              $ctrlNewRecharge.isLoading = false;
              if (response.data) {
                if (!response.data.amount) {
                  $ctrlNewRecharge.errors.push(
                    {message: response.data.message}
                  );
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
