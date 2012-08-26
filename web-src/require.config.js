require.config({
    paths: {
        jquery: '../lib/jquery'
        // underscore: '../lib/underscore-1.3.3',
        // backbonecore: '../lib/backbone-0.9.2',
        // backbone: '../lib/backbone-relational-0.5.0'
    },
    shim: {
        jquery: {
            exports: 'jQuery'
        }
        // underscore: {
        //     deps: ['jquery'],
        //     exports: '_'
        // },
        // backbonecore: {
        //     deps: ['underscore'],
        //     exports: 'Backbone'
        // },
        // backbone: {
        //     deps: ['backbonecore'],
        //     exports: 'Backbone'
        // }
    },
    baseUrl: 'src'
});
