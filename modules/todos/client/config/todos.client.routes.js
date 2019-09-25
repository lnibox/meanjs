(function() {
    'use strict';

    angular.module('todos.routes')
    .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider.state('todos', {
            url: '/todos',
            templateUrl: '/modules/todos/client/views/todos.client.view.html',
            controller: 'TodosController',
            controllerAs: 'vm',
            data: {
                role: ['user', 'amin']
            }
        });
    }

})();