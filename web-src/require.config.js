require.config({
    paths: {
        jquery: '../lib/jquery',
        underscore: '../lib/underscore',
        backbone: '../lib/backbone'
    },
    shim: {
        jquery: {
            exports: 'jQuery'
        },
        underscore: {
            deps: ['jquery'],
            exports: '_'
        },
        backbone: {
            deps: ['underscore'],
            exports: 'Backbone'
        }
    },
    baseUrl: 'src'
});
