'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path'),
    config = require(path.resolve('./config/config')),
    chalk = require('chalk');

var TodoSchema = new Schema({
    title: {
        type: String,
        default: ''
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

TodoSchema.statics.seed = seed;

mongoose.model('Todo', TodoSchema);

function seed() {
    var ToDo = mongoose.model('ToDo');

    return new Promise(function (resolve, reject) {
  
      skipDocument()
        .then(findAdminUser)
        .then(add)
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (err) {
          return reject(err);
        });
  
      function findAdminUser(skip) {
        var User = mongoose.model('User');
  
        return new Promise(function (resolve, reject) {
          if (skip) {
            return resolve(true);
          }
  
          User
            .findOne({
              roles: { $in: ['admin'] }
            })
            .exec(function (err, admin) {
              if (err) {
                return reject(err);
              }
  
              doc.user = admin;
  
              return resolve();
            });
        });
      }
  
      function skipDocument() {
        return new Promise(function (resolve, reject) {
          ToDo
            .findOne({
              title: doc.title
            })
            .exec(function (err, existing) {
              if (err) {
                return reject(err);
              }
  
              if (!existing) {
                return resolve(false);
              }
  
              if (existing && !options.overwrite) {
                return resolve(true);
              }
  
              // Remove ToDo (overwrite)
  
              existing.remove(function (err) {
                if (err) {
                  return reject(err);
                }
  
                return resolve(false);
              });
            });
        });
      }
  
      function add(skip) {
        return new Promise(function (resolve, reject) {
          if (skip) {
            return resolve({
              message: chalk.yellow('Database Seeding: ToDo\t' + doc.title + ' skipped')
            });
          }
  
          var todo = new ToDo(doc);
  
          todo.save(function (err) {
            if (err) {
              return reject(err);
            }
  
            return resolve({
              message: 'Database Seeding: ToDo\t' + todo.title + ' added'
            });
          });
        });
      }
    });
  }