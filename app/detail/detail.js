(function () {
    'use strict';

    angular
        .module('app.detail')
        .controller('Detail', Detail);

    /* @ngInject */
    function Detail(dataservice, $stateParams) {
        /*jshint validthis: true */
        var vm = this;

        /*jshint camelcase: false */
        vm.user = {
            user_id: '',
            user_name: '',
            user_custom: '',
            email: ''
        };

        console.log($stateParams.id);

        if ($stateParams.id) {
            activate();
        }

        function activate() {
            return getUser();
        }

        function getUser() {
            vm.isLoading = true;
            return dataservice.getOneUser($stateParams.id)
                .then(function (response) {
                    vm.user = response.data;
                });
        }

    }

})();
