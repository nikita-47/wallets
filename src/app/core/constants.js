/* global toastr:false, moment:false */
(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('baseUrl', 'https://livedemo.xsolla.com/fe/test-task/baev')
        .constant('transDateTimeFormat', 'YYYY-MM-DD HH:mm')
        .constant('moment', moment);
})();
