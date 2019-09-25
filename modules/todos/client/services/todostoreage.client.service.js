(function() {
    'use strict';

    angular.module('todos.services')
    .factory('TodosStorage', TodosStorage)
    .factory('LocalStorage', LocalStorage);

    TodosStorage.$inject = ['$http', '$injector'];
    LocalStorage.$inject = ['$q'];

    function TodosStorage($http, $injector) {
        return $injector.get('LocalStorage');
    }

    function LocalStorage($q) {
        var STORAGE_ID = 'todos-angularjs';

        var store = {
            todos: [],

            _getFromLocalStorage: function () {
                return todos;
            },

            _saveToLocalStorage: function (newTodos) {
                this.todos = newTodos;
            },

            clearCompleted: function () {
                var completeTodos = [];
                var incompleteTodos = [];
                store.todos.forEach(function (todo) {
                    if (todo.completed) {
                        completeTodos.push(todo);
                    } else {
                        incompleteTodos.push(todo);
                    }
                });

                angular.copy(incompleteTodos, store.todos);
            },

            delete: function (todo) {
                store.todos.splice(store.todos.indexOf(todo), 1);
            },

            get: function () {
            },

            insert: function (todo) {
                store.todos.push(todo);
            },

            put: function (todo, index) {
                store.todos[index] = todo;
            }
        };

        return store;
    }

})();