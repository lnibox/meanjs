'use strict';

var mongoose = require('mongoose'),
  Todo = mongoose.model('Todo'),
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.create = function (req, res) {
  var todo = new Todo(req.body);
  todo.user = req.user;

  todo.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(todo);
    }
  });
};

exports.list = function (req, res) {
  Todo.find(function (err, todos) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(todos);
  });
};

exports.delete = function (req, res) {
  Todo.findByIdAndRemove(req.params.todoId, function (err, post) {
    res.json({ success: true, message: 'Deleted' });
  });
};

