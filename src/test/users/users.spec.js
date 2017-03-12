'use strict';

describe("Testing Users", function () {

    beforeEach(module('app.users'));

    var Ctrl;
    beforeEach(inject(function($controller, $state) {
        Ctrl = $controller('Users');
        spyOn($state, 'go');
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

    it("should open user detail", inject(function($state) {
        var userId = 0;
        Ctrl.openUser(userId);
        expect($state.go).toHaveBeenCalledWith('detail', {id: userId});
    }));

});