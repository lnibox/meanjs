(function(app) {
    'use strict';

    app.registerModule('templates', ['core']);
    app.registerModule('templates.services');
    app.registerModule('templates.route', ['templates.services']);

})(ApplicationConfiguration);