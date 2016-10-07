'use strict';

angular.module('app')
  .controller('SignupCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.authError = null;

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.authError = null;

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            $scope.authError = error.message;
          });
        });
      }
    };

  });
