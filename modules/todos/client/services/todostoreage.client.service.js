(function () {
    'use strict';

    angular.module('todos.services')
        .factory('Todos', Todos);

    Todos.$inject = ['$http', '$q', 'TodoResources'];

    function Todos($http, $q, TodoResources) {

        function getAll() {
            var deferred = $q.defer();
            $http.get(TodoResources.todosPath, TodoResources.todosParamNoCache).then(function (todos) {
                deferred.resolve(todos.data);
            }), function (err) {
                deferred.reject(err);
            };
            return deferred.promise;
        }

        function putTask(task) {
            var deferred = $q.defer();
            $http.post(TodoResources.todosPath, task, TodoResources.todosParamNoCache).then(function (todos) {
                deferred.resolve(todos);
            }), function (err) {
                deferred.reject(err);
            };
            return deferred.promise;
        }

        function deleteTask(todoId) {
            var deferred = $q.defer();
            $http.delete(TodoResources.todosPath + todoId).then(function (todos) {
                deferred.resolve(todos);
            }), function (err) {
                deferred.reject(err);
            };
            return deferred.promise;
        }

        function updateTask(todo) {
            var deferred = $q.defer();
            $http.put(TodoResources.todosPath + todo['_id'], todo).then(function (todos) {
                deferred.resolve(todos);
            }), function (err) {
                deferred.reject(err);
            };
            return deferred.promise;
        }

        return {
            getAll: getAll,
            putTask: putTask,
            deleteTask: deleteTask,
            updateTask: updateTask
        };

    }

})();