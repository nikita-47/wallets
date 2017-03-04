angular.
  module('core.user').
  factory('User', ['$resource',
    function($resource) {
      return $resource('https://livedemo.xsolla.com/fe/test-task/baev/users?offset=0&limit=5', {}, {
        query: {
          method: 'GET',
          isObject: true
        }
      });
    }
  ]);