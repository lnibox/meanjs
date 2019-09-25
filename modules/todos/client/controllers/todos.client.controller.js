(function() {
    'use strict';

    angular.module('todos')
    .controller('TodosController', TodosController);

    TodosController.$inject = ['$scope', '$state', 'Authentication', 'Socket', '$routeParams', '$filter', 'TodosStorage'];

    function TodosController($scope, $state, Authentication, Socket, $routeParams, $filter, TodosStorage) {
        var vm = this;

        var todos = $scope.todos = TodosStorage.todos;

        $scope.newTodo = '';
        $scope.editedTodo = null;

        $scope.$watch('todos', function () {
            $scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
            $scope.completedCount = todos.length - $scope.remainingCount;
            $scope.allChecked = !$scope.remainingCount;
        }, true);

        // Monitor the current route for changes and adjust the filter accordingly.
        $scope.$on('$routeChangeSuccess', function () {
            var status = $scope.status = $routeParams.status || '';

            $scope.statusFilter = (status === 'active') ?
                { completed: false } : (status === 'completed') ?
                { completed: true } : {};
        });

        $scope.addTodo = function () {
            var newTodo = {
                title: $scope.newTodo.trim(),
                completed: false
            };

            if (!newTodo.title) {
                return;
            }

            TodosStorage.insert(newTodo);
            $scope.newTodo = '';
        };

        $scope.editTodo = function (todo) {
            $scope.editedTodo = todo;
            // Clone the original todo to restore it on demand.
            $scope.originalTodo = angular.extend({}, todo);
        };

        $scope.saveEdits = function (todo, event) {
            // Blur events are automatically triggered after the form submit event.
            // This does some unfortunate logic handling to prevent saving twice.
            if (event === 'blur' && $scope.saveEvent === 'submit') {
                $scope.saveEvent = null;
                return;
            }

            $scope.saveEvent = event;

            if ($scope.reverted) {
                // Todo edits were reverted-- don't save.
                $scope.reverted = null;
                return;
            }

            todo.title = todo.title.trim();

            if (todo.title === $scope.originalTodo.title) {
                $scope.editedTodo = null;
                return;
            }

            TodosStorage[todo.title ? 'put' : 'delete'](todo);
            $scope.editedTodo = null;
        };

        $scope.revertEdits = function (todo) {
            todos[todos.indexOf(todo)] = $scope.originalTodo;
            $scope.editedTodo = null;
            $scope.originalTodo = null;
            $scope.reverted = true;
        };

        $scope.removeTodo = function (todo) {
            TodosStorage.delete(todo);
        };

        $scope.saveTodo = function (todo) {
            TodosStorage.put(todo);
        };

        $scope.toggleCompleted = function (todo, completed) {
            if (angular.isDefined(completed)) {
                todo.completed = completed;
            }
            TodosStorage.put(todo, todos.indexOf(todo));
        };

        $scope.clearCompletedTodos = function () {
            TodosStorage.clearCompleted();
        };

        $scope.markAll = function (completed) {
            todos.forEach(function (todo) {
                if (todo.completed !== completed) {
                    $scope.toggleCompleted(todo, completed);
                }
            });
        };
    }

})();