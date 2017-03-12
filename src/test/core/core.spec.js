'use strict';

describe('Testing Dataservice', function() {

    beforeEach(module('app.core'));

    var dataservice, $httpBackend;
    var baseUrl;
    var userId = 'unit';

    beforeEach(inject(function(_dataservice_, _$httpBackend_, $injector, toastr) {

        dataservice = _dataservice_;
        $httpBackend = _$httpBackend_;
        baseUrl = $injector.get('baseUrl');

        spyOn(toastr, 'error');

    }));


    it('should be ready', inject(function ($timeout) {

        var prime = dataservice.ready();
        $timeout.flush();
        $timeout.verifyNoPendingTasks();
        expect(prime.$$state.status).toBe(1);

    }));


    it('should get users', function() {

        var getUsersUrl = baseUrl + '/users?offset=0&limit=10';
        $httpBackend.expect('GET', getUsersUrl).respond(200);
        dataservice.getUsers({ offset: 0, limit: 10 });
        expect($httpBackend.flush).not.toThrow();

    });


    it('should get one user', function() {

        var getUserUrl = baseUrl + '/users/' + userId;
        $httpBackend.expect('GET', getUserUrl).respond(200);
        dataservice.getOneUser(userId);
        expect($httpBackend.flush).not.toThrow();

    });


    it('should update user', function() {

        var putUserUrl = baseUrl + '/users/' + userId;
        $httpBackend.expect('PUT', putUserUrl).respond(200);
        dataservice.updateUser(userId);
        expect($httpBackend.flush).not.toThrow();

    });


    it('should create user', function() {

        var postUserUrl = baseUrl + '/users';
        $httpBackend.expect('POST', postUserUrl).respond(200);
        dataservice.createUser({ user_id: userId });
        expect($httpBackend.flush).not.toThrow();

    });


    it('should catch an error', inject(function(toastr) {

        var postUserUrl = baseUrl + '/users';
        $httpBackend.expect('POST', postUserUrl).respond(500);
        dataservice.createUser({ user_id: userId });
        expect($httpBackend.flush).not.toThrow();
        expect(toastr.error).toHaveBeenCalled();

    }));


    it('should create recharge', function() {

        var postRechargeUrl = baseUrl + '/users/' + userId + '/recharge';

        var dataRecharge = {
            amount: 0,
            comment: 'test'
        };

        $httpBackend.expect('POST', postRechargeUrl).respond(200);
        dataservice.createRecharge(userId, dataRecharge);
        expect($httpBackend.flush).not.toThrow();

    });


    it('should get transaction one user', function() {

        var getTransUrl = baseUrl + '/users/' + userId + '/transactions';
        getTransUrl += '?datetime_from=2017-03-04T19:00:00Z&datetime_to=2017-03-12T18:59:59Z';

        var params = {
            datetime_from: '2017-03-04T19:00:00Z',
            datetime_to: '2017-03-12T18:59:59Z'
        };

        $httpBackend.expect('GET', getTransUrl).respond(200);
        dataservice.getTransactions(userId, params);
        expect($httpBackend.flush).not.toThrow();

    });

});
