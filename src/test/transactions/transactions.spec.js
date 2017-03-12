'use strict';

describe("Testing Transactions", function () {

    beforeEach(module('app.transactions', 'app.users'));

    var Ctrl, scope, stateparams, $httpBackend;
    var userId = 0;
    var baseUrl;

    beforeEach(inject(function ($controller, $rootScope, $injector, _$httpBackend_) {
        stateparams = { id: userId };
        scope = $rootScope.$new();
        Ctrl = $controller('Transactions', {
            $scope: scope,
            $stateParams: stateparams
        });

        $httpBackend = _$httpBackend_;
        baseUrl = $injector.get('baseUrl');

    }));


    it("should init detail with id 0", function () {
        expect(Ctrl.id).toEqual(userId);
    });


    it("should refresh transactions empty", inject(function ($timeout, $injector) {

        var moment = $injector.get('moment');
        var momentFrom = moment('2017-03-04T19:00:00').utc(true).startOf('day');
        var momentTo = moment('2017-03-12T18:59:59').utc(true).endOf('day');

        var getTransUrl = baseUrl + '/users/' + userId + '/transactions';
        getTransUrl += '?datetime_from=' + momentFrom.format();
        getTransUrl += '&datetime_to=' + momentTo.format() + '';
        getTransUrl += '&transaction_type=type';

        Ctrl.params = {
            datetimeFrom: momentFrom,
            datetimeTo: momentTo,
            transType: 'type'
        };

        $httpBackend.expect('GET').respond([]); // init page request
        $httpBackend.expect('GET', getTransUrl).respond([]); // test request
        Ctrl.reloadTrans();
        $timeout.flush();
        $timeout.verifyNoPendingTasks();
        expect($httpBackend.flush).not.toThrow();

    }));


    it("should refresh transactions not empty", inject(function ($timeout, $injector) {

        var moment = $injector.get('moment');
        var response = {
            date: moment().format()
        };

        $httpBackend.expect('GET').respond([response]);
        $timeout.flush();
        $timeout.verifyNoPendingTasks();
        expect($httpBackend.flush).not.toThrow();

    }));

});