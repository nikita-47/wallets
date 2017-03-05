angular.module('userCreate', [
  'ngRoute', 'core.user'
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
  .module('userCreate')
  .component('userCreate', {
    templateUrl: 'user-create/user-create.template.html',
    controller: ['CreateUser', '$routeParams', '$location',
      function (CreateUser, $routeParams, $location) {
        const $ctrl = this;

        $ctrl.user = {
          user_id: '',
          user_name: '',
          user_custom: '',
          email: ''
        };

        $ctrl.createUser = function (user) {
          $ctrl.errors = [];
          if (user.email.length > 0) {
            if (!emailRegexp.test(user.email)) {
              $ctrl.errors.push({message: 'Invalid email'});
            }
          }
          if (!user.user_id) {
            $ctrl.errors.push({message: 'ID is required!'});
          }

          if ($ctrl.errors.length > 0) {
            return;
          }

          $ctrl.isLoading = true;
          CreateUser(
            user,
            function (response) {
              $ctrl.isLoading = false;
              if (response.data) {
                if (response.data.http_status_code != 204) {
                  $ctrl.errors.push({ message: response.data.message });
                }
              }
            },
            function (error) {
              $ctrl.errors.push({ message: error.message });
              $ctrl.isLoading = false;
            }
          );

        };

        $ctrl.backToAll = function () {
          $location.path('/users');
        };

      }
    ]
  });
