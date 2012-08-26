define(function() {

describe("Basic Framework Setup", function() {

    it("runs jasmine specs", function() {
        expect(true).toEqual(true);
    });

    it("loads jquery", function() {
        var jQuerySentinal;
        runs(function() {
            jQuerySentinal = false;
            requirejs(['jquery'], function($) {
                jQuerySentinal = $;
            });
        });

        waitsFor(function() {
            return jQuerySentinal !== false;
        }, "jQuery not loaded.", 250);
    });
});

});
