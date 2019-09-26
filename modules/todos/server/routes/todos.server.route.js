'use strict';

var todo = require('../controllers/todos.server.controller');

module.exports = function (app) {
    app.route('/api/todos').all()
    .get(todo.list)
    .post(todo.create);

    app.route('/api/todos/:todoId').all()
    .delete(todo.delete);
  };