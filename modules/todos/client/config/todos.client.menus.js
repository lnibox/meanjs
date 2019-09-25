(function () {
    'use strict';
  
    angular
      .module('todos')
      .run(menuConfig);
  
    menuConfig.$inject = ['menuService'];
  
    function menuConfig(menuService) {
      menuService.addMenuItem('topbar', {
        title: 'Todos',
        state: 'todos',
        roles: ['*']
      });  
    }
  }());
  