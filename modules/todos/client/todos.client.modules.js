(function(app) {
    'use stritc';

    app.registerModule('todos', ['core']);
    app.registerModule('todos.services');
    app.registerModule('todos.routes', ['ui.router', 'ngRoute', 'core.routes', 'todos.services']);
})(ApplicationConfiguration);