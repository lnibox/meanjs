(function() {
    'use strict';

    angular.module('todos.services')
        .directive('todoFooter', TodoFooter);

    TodoFooter.$inject = [];

    function TodoFooter() {
        return {
            restrict: 'E',
            templateUrl: '/modules/todos/client/views/todosfooter.client.view.html'
        }
    }
})();
