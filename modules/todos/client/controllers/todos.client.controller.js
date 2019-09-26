(function () {
    'use strict';

    angular.module('todos')
        .controller('TodosController', TodosController);

    TodosController.$inject = ['$scope', '$state', 'Authentication', 'Socket', '$routeParams', '$filter', '$timeout', 'Todos'];

    function TodosController($scope, $state, Authentication, Socket, $routeParams, $filter, $timeout, Todos) {
        var vm = this;

        vm.todos = { all: [] };

        var init = function () {
            var tmp = {};
            let promise = Todos.getAll();
            promise.then(function (data) {
                tmp = data;
            }, function (err) {
                console.error(err);
            }).finally(function () {
                $timeout(function () {
                    $scope.$apply(function () {
                        vm.todos.all = tmp;
                    });
                });
            });
        };
        init();


        $scope.newTodo = '';
        $scope.editedTodo = null;

        $scope.$watch('vm.todos', function () {
            $scope.remainingCount = $filter('filter')(vm.todos.all, { completed: false }).length;
            $scope.completedCount = vm.todos.all.length - $scope.remainingCount;
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

            Todos.putTask(newTodo);
            $scope.newTodo = '';
            init();
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
            vm.todos.all[vm.todos.all.indexOf(todo)] = $scope.originalTodo;
            $scope.editedTodo = null;
            $scope.originalTodo = null;
            $scope.reverted = true;
        };

        $scope.removeTodo = function (todo) {
            Todos.deleteTask(todo['_id']);
            init();
        };

        $scope.saveTodo = function (todo) {
            TodosStorage.put(todo);
        };

        $scope.toggleCompleted = function (todo) {
            Todos.updateTask(todo);
        };

        $scope.clearCompletedTodos = function () {
            TodosStorage.clearCompleted();
        };

        $scope.markAll = function (completed) {
            vm.todos.all.forEach(function (todo) {
                if (todo.completed !== completed) {
                    $scope.toggleCompleted(todo, completed);
                }
            });
        };
    }

})();