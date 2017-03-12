'use strict';

describe("Testing Detail", function () {

    beforeEach(module('app.detail'));

    var Ctrl, scope, stateparams;
    var testId = 0;
    beforeEach(inject(function ($controller, $rootScope) {
        stateparams = { id: testId };
        scope = $rootScope.$new();
        Ctrl = $controller('Detail', {
            $scope: scope,
            $stateParams: stateparams
        });
    }));

    it("should init detail with id 0", function () {
        expect(Ctrl.user.user_id).toEqual('');
        expect(Ctrl.id).toEqual(testId);
    });

});