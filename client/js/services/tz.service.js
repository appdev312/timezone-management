'use strict';

angular.module('app')
  .factory('Timezone', function ($resource) {
    return $resource('/api/timezones/:controller/:id', {
      id: '@_id',
      controller: '@_controller'
    },

    {
      get: {
        method: 'GET',
        isArray: true,
        params: { }
      },
      getItem: {
        method: 'GET'
      },
      new: {
        method: 'POST'
      },
      update: {
        method: 'PUT'
      },
      delete: {
        method: 'DELETE'
      }
	  });
  });