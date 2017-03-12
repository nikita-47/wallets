'use strict';

describe("loader", function () {

    beforeEach(module('app.widgets'));

    var scope, element;
    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        scope.vm = {
            isLoading: true,
        };

        element = angular.element(
            '<loader loading="{{ vm.isLoading }}"></loader>'
        );

        element = $compile(element)(scope);

        $rootScope.$digest();
    }));

    it("should have active class", function () {
        expect(element.hasClass('active')).toBe(false);
    });

    it("shouldn't have active class", inject(function($timeout) {
        scope.vm = {
            isLoading: false,
        };

        $timeout.flush();
        $timeout.verifyNoPendingTasks();

        expect(element.hasClass('active')).toBe(false);
    }));

});