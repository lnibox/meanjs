(function () {
    'use strict';
    angular.module('todos')
        .factory('TodoConsts', TodoConsts);

    TodoConsts.$inject = [];

    function TodoConsts() {
        return {
            api: {
                path: {
                    todos: '/api/todos/'
                },
                param: {
                    noCache: {
                        headers: { 'Cache-Control': 'no-cache' }
                    }
                }
            }
        };
    };
})();