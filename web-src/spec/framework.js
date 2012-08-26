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

        runs(function() {
            expect($(document).length).toEqual(1);
        });
    });

    it("loads underscore", function() {
        var _Sentinal;
        runs(function() {
            _Sentinal = false;
            requirejs(['underscore'], function(_) {
                _Sentinal = _;
            });
        });

        waitsFor(function() {
            return _Sentinal;
        }, "Underscore not loaded.", 250);

        runs(function() {
            expect(typeof _.each).toEqual('function');
        });
    });

    it("loads backbone", function() {
        var backboneSentinal;
        runs(function() {
            backboneSentinal = false;
            requirejs(['backbone'], function(Backbone) {
                backboneSentinal = Backbone;
            });
        });

        waitsFor(function() {
            return backboneSentinal;
        }, "Backbone not loaded.", 250);

        runs(function() {
            expect(typeof Backbone.View).toEqual('function');
        });
    });
});

});
