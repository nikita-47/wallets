angular
  .module('core-api').factory('api', [
  function () {
    var baseUrl = 'https://livedemo.xsolla.com/fe/test-task/baev';
    return function api($http) {
      /**
       * Add callbacks
       *
       * @param {Promise} q
       * @param {Function} success callback
       * @param {Function} error callback
       * @returns {Promise}
       */
      function addCallbacks(q, success, error) {
        if (success && error) {
          return q.then(
            result => {
              success(result);
            },
            error => {
              error(error);
            });
        }
        if (error) {
          return q.then(
            error => {
              error(error);
            });
        }
        if (success) {
          return q.then(
            result => {
              success(result);
            });
        }
        return q;
      }

      /**
       * Query for get list
       *
       * @param {string} url
       * @param {object} params
       * @param {function} successCb
       * @param {function} errorCb
       * @returns {Promise}
       */
      function getList(url, params = null, successCb = null, errorCb = null) {
        var paramsString = '';
        if (params) {
          paramsString = '?';
          for (var key in params) {
            if (params.hasOwnProperty(key)) {
              paramsString += key + '=' + params[key] + '&';
            }
          }
          paramsString = paramsString.slice(0, -1);
        }
        var q = $http.get(baseUrl + url + paramsString);
        return addCallbacks(q, successCb, errorCb);
      }

      /**
       * Update request
       *
       * @param {string} url
       * @param {Object} data
       * @param {Function} [successCb]
       * @param {Function} [errorCb]
       * @returns {Promise}
       */
      function update(url, data, successCb, errorCb) {
        if (!data) {
          data = {};
        }
        var q = $http.put(baseUrl + url, data);
        return addCallbacks(q, successCb, errorCb);
      }

      /**
       * Create query
       *
       * @param {string} url
       * @param {object} data
       * @param {Function} [successCb]
       * @param {Function} [errorCb]
       * @returns {Promise}
       */
      function create(url, data, successCb, errorCb) {
        var q = $http.post(baseUrl + url, data);
        return addCallbacks(q, successCb, errorCb);
      }

      return {
        update: update,
        create: create,
        getList: getList
      }
    }
  }
]);
