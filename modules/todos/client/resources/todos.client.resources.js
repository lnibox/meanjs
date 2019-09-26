(function() {
    'use strict';

    angular.module('todos')
    .service('TodoResources', TodoResources);

    TodoResources.$inject = ['TodoConsts'];

    function TodoResources(TodoConsts) {
        this.todosPath = TodoConsts.api.path.todos;
        this.todosParamNoCache = TodoConsts.api.param.noCache;
    }

})();