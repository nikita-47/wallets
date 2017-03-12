'use strict';

describe("Testing Transactions", function () {

    beforeEach(module('app.transactions'));

    var Ctrl, scope, stateparams;
    var testId = 0;
    beforeEach(inject(function ($controller, $rootScope) {
        stateparams = { id: testId };
        scope = $rootScope.$new();
        Ctrl = $controller('Transactions', {
            $scope: scope,
            $stateParams: stateparams
        });
    }));

    it("should init detail with id 0", function () {
        expect(Ctrl.id).toEqual(testId);
    });

});