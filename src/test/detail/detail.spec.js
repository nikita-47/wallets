'use strict';

describe("Testing Detail", function () {

    beforeEach(module('app.detail', 'app.users'));

    var Ctrl, scope, stateparams, $httpBackend;
    var userId = 'unit';
    var baseUrl;

    beforeEach(inject(function ($controller,
                                $rootScope,
                                $injector,
                                _$httpBackend_,
                                $state) {
        stateparams = {id: userId};
        scope = $rootScope.$new();

        Ctrl = $controller('Detail', {
            $scope: scope,
            $stateParams: stateparams
        });

        $httpBackend = _$httpBackend_;
        baseUrl = $injector.get('baseUrl');

        spyOn($state, 'go');
    }));


    it("should init detail with id unit", function () {
        expect(Ctrl.user.user_id).toEqual('');
        expect(Ctrl.id).toEqual(userId);
    });


    it("should expect loading", inject(function ($timeout) {
        var getUserUrl = baseUrl + '/users/' + userId;
        $httpBackend.expect('GET', getUserUrl).respond(200);
        $timeout.flush();
        $timeout.verifyNoPendingTasks();
        expect($httpBackend.flush).not.toThrow();
    }));


    it("should create recharge", inject(function ($timeout) {

        var getUserUrl = baseUrl + '/users/' + userId;
        $httpBackend.expect('GET', getUserUrl).respond({
            user_id: userId,
            balance: 0,
            wallet_currency: 'USD'
        });
        $timeout.flush();
        $timeout.verifyNoPendingTasks();
        expect($httpBackend.flush).not.toThrow();

        Ctrl.newRecharge = {
            amount: 1,
            comment: 'test'
        };

        var postRechargeUrl = baseUrl + '/users/' + userId + '/recharge';
        $httpBackend.expect('POST', postRechargeUrl).respond({ amount: 1 });
        Ctrl.submitRecharge();
        $timeout.flush();
        $timeout.verifyNoPendingTasks();

        expect($httpBackend.flush).not.toThrow();

    }));


    it("should create recharge without currency", inject(function ($timeout) {

        var getUserUrl = baseUrl + '/users/' + userId;
        $httpBackend.expect('GET', getUserUrl).respond({
            user_id: userId,
            balance: 0,
        });
        $timeout.flush();
        $timeout.verifyNoPendingTasks();
        expect($httpBackend.flush).not.toThrow();

        Ctrl.newRecharge = {
            amount: 1,
            comment: 'test'
        };

        var postRechargeUrl = baseUrl + '/users/' + userId + '/recharge';
        $httpBackend.expect('POST', postRechargeUrl).respond({ amount: 1 });
        $httpBackend.expect('GET', getUserUrl).respond(200);
        Ctrl.submitRecharge();
        $timeout.flush();
        $timeout.verifyNoPendingTasks();

        expect($httpBackend.flush).not.toThrow();

    }));


    it("shouldn't submit user", function () {
        var user = {
            user_id: null,
            email: 'wrongemail'
        };

        var result = Ctrl.submitUser(user);
        expect(result).toBe(false);
    });


    it("should create user", inject(function ($timeout, $state) {

        var getUserUrl = baseUrl + '/users/' + userId;

        $httpBackend.expect('GET', getUserUrl).respond({
            user_id: userId,
            balance: 0
        });

        $timeout.flush();
        $timeout.verifyNoPendingTasks();

        Ctrl.id = null;

        var user = {
            user_id: userId,
            email: 'good@email.com'
        };

        var postUserUrl = baseUrl + '/users';
        $httpBackend.expect('POST', postUserUrl).respond();
        Ctrl.submitUser(user);
        expect($httpBackend.flush).not.toThrow();

        expect($state.go).toHaveBeenCalledWith('detail', {id: userId});

    }));


    it("should update user", inject(function ($timeout) {

        var getUserUrl = baseUrl + '/users/' + userId;

        $httpBackend.expect('GET', getUserUrl).respond({
            user_id: userId,
            balance: 0
        });

        $timeout.flush();
        $timeout.verifyNoPendingTasks();

        Ctrl.id = userId;

        var user = {
            user_id: userId,
            email: 'good@email.com'
        };

        var putUserUrl = baseUrl + '/users/' + userId;
        $httpBackend.expect('PUT', putUserUrl).respond(200);
        Ctrl.submitUser(user);
        expect($httpBackend.flush).not.toThrow();

    }));

});