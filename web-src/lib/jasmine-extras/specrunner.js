define(['../../spec.config'], function(allSpecs) {

    var specInterval = setInterval(function() {
        if (!window.isPhantom) {
            window.phantomSpecs = [];
        }
        if (undefined === window.phantomSpecs) {
            return;
        }
        clearInterval(specInterval);

        var jasmineEnv = jasmine.getEnv();
        jasmineEnv.updateInterval = 1000;

        if (!window.isPhantom) {
            reporter = new jasmine.HtmlReporter();
            jasmineEnv.specFilter = function(spec) {
                return reporter.specFilter(spec);
            };
        } else {
            reporter = new jasmine.ConsoleReporter();
        }

        jasmineEnv.addReporter(reporter);

        if (window.phantomSpecs.length == 0) {
            window.phantomSpecs = allSpecs;
        }

        var specPaths = [];
        var x;
        for (x = 0; x < window.phantomSpecs.length; ++x) {
            specPaths[x+1] = '../spec/' + window.phantomSpecs[x];
        }

        x = 0;

        var callback;
        callback = function(spec) {
            ++x;
            if (x == specPaths.length) {
                jasmineEnv.execute();
                return;
            }

            requirejs([specPaths[x]], callback);
        };
        requirejs([specPaths[0]], callback);
    }, 50);
});
