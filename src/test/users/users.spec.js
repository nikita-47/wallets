'use strict';

describe("Testing Users", function () {

    beforeEach(module('app.users'));

    var Ctrl, $httpBackend, baseUrl;
    beforeEach(inject(function($controller, $state, _$httpBackend_, $injector) {
        Ctrl = $controller('Users');
        spyOn($state, 'go');

        $httpBackend = _$httpBackend_;
        baseUrl = $injector.get('baseUrl');
    }));


    it("should have a empty user list", function() {
        expect(Ctrl.users).toEqual([]);
    });


    it("should have a 5 users per page", function() {
        expect(Ctrl.pageParams.limit).toEqual(5);
    });


    it("should have a 10 offset", function() {
        Ctrl.setPage(2);
        expect(Ctrl.pageParams.offset).toEqual(10);
    });


    it("should have a 30 offset", function() {
        Ctrl.selectPerPage(15);
        Ctrl.setPage(2);
        expect(Ctrl.pageParams.offset).toEqual(30);
    });


    it("should have a 15 users per page", function() {
        Ctrl.selectPerPage(15);
        expect(Ctrl.pageParams.limit).toEqual(15);
    });


    it("should create users request", inject(function($timeout) {

        var page = 4;
        var offset = page * Ctrl.pageParams.limit;

        var getUsersUrl = baseUrl + '/users?limit=5&offset=' + offset;
        var getUsersZeroOffset = baseUrl + '/users?limit=5&offset=0';

        Ctrl.setPage(page);

        var response = {
            recordsTotal: 100,
            data: [{}]
        };

        $httpBackend.expect('GET', getUsersZeroOffset).respond(response);
        $httpBackend.expect('GET', getUsersUrl).respond(response);
        $timeout.flush();
        $timeout.verifyNoPendingTasks();
        expect($httpBackend.flush).not.toThrow();

    }));


    it("should open user detail", inject(function($state) {
        var userId = 0;
        Ctrl.openUser(userId);
        expect($state.go).toHaveBeenCalledWith('detail', {id: userId});
    }));

});