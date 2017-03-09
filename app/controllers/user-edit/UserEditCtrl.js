angular.module('userEdit', [
  'ui.router',
  'core.user'
]);

const emailRegexp = new RegExp(
  [
    '^',
    '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*',
    '|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]',
    '|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")',
    '@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?',
    '|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}',
    '(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:',
    '(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]',
    '|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)',
    '\\])',
    '$'
  ].join('')
);

angular
  .module('userEdit')
  .component('userEdit', {
    templateUrl: 'controllers/user-edit/UserEditTemplate.html',
    controllerAs: '$ctrlEdit',
    controller: [
      'CreateUser',
      'UpdateUser',
      'OneUser',
      '$stateParams',
      '$state',
      function (
        CreateUser,
        UpdateUser,
        OneUser,
        $stateParams,
        $state) {
        const $ctrlEdit = this;

        $ctrlEdit.user = {
          user_id: '',
          user_name: '',
          user_custom: '',
          email: ''
        };

        if ($stateParams.id) {
          $ctrlEdit.userId = $stateParams.id;
          $ctrlEdit.isLoading = true;
          OneUser(
            $ctrlEdit.userId,
            function (response) {
              $ctrlEdit.user = response.data;
              $ctrlEdit.isLoading = false;
            },
            function () {
              $ctrlEdit.isLoading = false;
            }
          );
        }

        $ctrlEdit.submitUser = function (user) {
          $ctrlEdit.errors = [];
          if (user.email.length > 0) {
            if (!emailRegexp.test(user.email)) {
              $ctrlEdit.errors.push({message: 'Invalid email'});
            }
          }
          if (!user.user_id) {
            $ctrlEdit.errors.push({message: 'ID is required!'});
          }

          if ($ctrlEdit.errors.length > 0) {
            return;
          }

          $ctrlEdit.isLoading = true;
          if (!$ctrlEdit.userId) {
            CreateUser(
              user,
              function (response) {
                $ctrlEdit.isLoading = false;
                if (response.data) {
                  if (response.data.http_status_code != 204) {
                    $ctrlEdit.errors.push({message: response.data.message});
                  }
                } else {
                  $state.go('user-detail', { id: user.user_id });
                }
              },
              function (error) {
                $ctrlEdit.errors.push({message: error.message});
                $ctrlEdit.isLoading = false;
              }
            );
          } else {
            UpdateUser(
              $ctrlEdit.userId,
              user,
              function (response) {
                $ctrlEdit.isLoading = false;
                if (response.data) {
                  if (response.data.http_status_code != 204) {
                    $ctrlEdit.errors.push({message: response.data.message});
                  }
                }
              },
              function (error) {
                $ctrlEdit.errors.push({message: error.message});
                $ctrlEdit.isLoading = false;
              }
            );
          }

        };
      }
    ]
  });
