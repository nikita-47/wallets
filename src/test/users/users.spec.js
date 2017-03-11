'use strict';

describe("Testing Users", function () {
    var users;
    beforeEach(module('app.users'));

    var scope, vm;
    beforeEach(inject(function (_$rootScope_) {
        scope = _$rootScope_.$new();
        vm = $controller('Users', { $scope: scope });
    }));

    // 2. Inject $controller
    var Ctrl;
    beforeEach(inject(function($controller) {
        Ctrl = $controller('Users');
    }));

    // 4. Test the controller
    it("should have a value", function() {
        expect(Ctrl.users).toEqual([]);
    });

    it("should have a message", function() {
        expect(Ctrl.getMessage()).toEqual("easy!");
    });

});