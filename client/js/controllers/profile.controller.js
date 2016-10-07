'use strict';

angular.module('app')
  .controller('ProfileCtrl', function ($scope, User, Auth) {

    $scope.edituser = { userSettings: {} };
    if (Auth.getCurrentUser().hasOwnProperty('$promise')) {
      Auth.getCurrentUser().$promise.then(function() {
        $scope.edituser = JSON.parse(JSON.stringify(Auth.getCurrentUser()));
        delete $scope.edituser._id;
      });
    } else if (Auth.getCurrentUser().hasOwnProperty('role')) {
      $scope.edituser = JSON.parse(JSON.stringify(Auth.getCurrentUser()));
      delete $scope.edituser._id;
    }


    $scope.updatePassword = function(form) {
      if ($scope.password1 == "" || $scope.password1 != $scope.password2)
      {
        if ($("#notification").is(':hidden'))
        {
          $("#notification").fadeIn("slow").html("New password and confirm passwords don't match.").delay(2000).fadeOut('slow');
        }
        return;
      }
      
      if(form.$valid) {
        Auth.changePassword( JSON.stringify(CryptoJS.SHA1($scope.opassword).words), JSON.stringify(CryptoJS.SHA1($scope.password1).words) )
        .then( function() {
          if ($("#notification_success").is(':hidden'))
          {
            $("#notification_success").fadeIn("slow").html("Password successfully changed.").delay(2000).fadeOut('slow');
          }
          $scope.password1 = $scope.password2 = $scope.opassword = "";
          $scope.PasswordForm = false;
        })
        .catch( function() {
          if ($("#notification").is(':hidden'))
          {
            $("#notification").fadeIn("slow").html('Incorrect password').delay(2000).fadeOut('slow');
          }
        });
      }
		};

    $scope.updateProfile = function(form) {
      if(form.$valid) {
        Auth.updateProfile( $scope.edituser, function(user) {
          if (typeof user.status == "undefined")
            Auth.setCurrentUser(user);
        })
        .then( function() {
          if ($("#notification_success").is(':hidden'))
          {
            $("#notification_success").fadeIn("slow").html("User profile changed.").delay(2000).fadeOut('slow');
          }
        })
        .catch( function() {
          if ($("#notification").is(':hidden'))
          {
            $("#notification").fadeIn("slow").html('Something went wrong, profile not changed!').delay(2000).fadeOut('slow');
          }
        });
      }
    };
  });
