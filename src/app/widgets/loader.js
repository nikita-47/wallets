(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('loader', loader);

    /* @ngInject */
    function loader($timeout) {
        var directive = {
            restrict: 'EA',
            template: '<div class="ui inverted dimmer">' +
            '<div class="ui loader"></div></div>',
            replace: true,
            scope: {
                loading: '@'
            },
            link: link
        };
        return directive;

        function link($scope, element) {

            $scope.$watch('loading', function (value) {
                // wait until data has been loaded
                $timeout(function () {
                    $scope.$apply(function () {
                        var isTrueSet = (value === 'true');
                        element.toggleClass('active', isTrueSet);
                    });
                });
            });

        }
    }

})();
