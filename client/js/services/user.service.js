'use strict';

angular.module('app')
  .factory('User', function ($resource) {
    return $resource('/api/users/:controller/:id', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'updatePassword'
        }
      },
      updateProfile: {
        method: 'PUT'
      },
      register: {
        method: 'POST',
        params: {
          controller:'register'
        }
      },
      get: {
        method: 'GET',
        params: {
          controller: 'profile'
        }
      },
      list: {
        method: 'GET',
        isArray: true
      },
      delete: {
        method: 'DELETE'
      }
	  });
  });