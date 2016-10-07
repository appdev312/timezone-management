/* Controllers */
app.controller('userListCtrl', ['$scope', '$http', '$state', '$localStorage', 'User', 'Auth', 
              function($scope, $http, $state, $localStorage, User, Auth) {

    $scope.users = [];
    
    if (Auth.canManageUsers())
    {
      User.list(function(data) {
        for (var i = 0; i < data.length; i ++)
        {
          $scope.users.push(data[i]);
        }
      });
    }
    
    $scope.$watch('users', function() {
        $('.footable').trigger('footable_redraw');
    });

    $scope.removeUser = function(id)
    {
      if (confirm("Do you really want to remove the user?"))
      {
        for (var i = 0; i < $scope.users.length; i ++)
        {
          if ($scope.users[i]._id == id)
          {
            User.delete({id: id}, function(data) {
              if ($("#notification_success").is(':hidden'))
                $("#notification_success").fadeIn("slow").html('Successfully deleted.').delay(1000).fadeOut('slow');
              delete $scope.users.splice(i, 1);
            }, function(err){
              if (err.status == 404)
              {
                if ($("#notification").is(':hidden'))
                  $("#notification").fadeIn("slow").html('Not found.').delay(1000).fadeOut('slow');
                delete $scope.users.splice(i, 1);
              }else{
                if ($("#notification").is(':hidden'))
                  $("#notification").fadeIn("slow").html('Something went wrong.').delay(1000).fadeOut('slow');
                $state.go("app.profile");
              }
            });
            
            break;
          }
        }
      }
    }

    $scope.editUser = function(id)
    {
      $state.go("app.edituser", {id: id});
    }

    $scope.editable = function(id){
      if (id == Auth.getCurrentUser()._id)
        return false;
      return true;
    }
}]);

app.controller('userEditCtrl', ['$q', '$stateParams', '$scope', '$http', '$state', '$localStorage', 'Auth', 'User', 
                      function ( $q ,  $stateParams ,  $scope ,  $http ,  $state ,  $localStorage ,  Auth ,  User) {

  $scope.isEdit = false;
  $scope.edituser = { role: "user" };
  $scope.roles = ["user", "manager", "admin"];

  if ($stateParams.id !== ""){
    $scope.isEdit = true;
    $scope.password1 = "*****";
    $scope.password2 = "*****";
  }

  if ($scope.isEdit){
    User.get({ id: $stateParams.id}, function(usr) {
      var params = ["name", "email", "role"];
      for (var par in params)
        $scope.edituser[params[par]] = usr[params[par]];
    },
    function(err){
      if ($("#notification").is(':hidden'))
        $("#notification").fadeIn("slow").html("Not found.").delay(1000).fadeOut('slow');
      $state.go("app.users");
    });
  }

  $scope.cancel = function(){
    $state.go("app.users");
  }

  $scope.save = function(){
    if ($scope.isEdit)
    {
      User.updateProfile({ id: $stateParams.id }, $scope.edituser, function(data) {
        if ($("#notification_success").is(':hidden'))
          $("#notification_success").fadeIn("slow").html('Successfully updated.').delay(1000).fadeOut('slow');
      }, function(err){
        if ($("#notification").is(':hidden'))
          $("#notification").fadeIn("slow").html("Something went wrong.").delay(1000).fadeOut('slow');
      });
    }else{
      if ($scope.password1 == "" || $scope.password1 != $scope.password2)
      {
        if ($("#notification").is(':hidden'))
          $("#notification").fadeIn("slow").html("New password and confirm passwords don't match.").delay(2000).fadeOut('slow');
        return;
      }

      $scope.edituser.password = $scope.password1;

      User.register($scope.edituser, function(data) {
        if ($("#notification_success").is(':hidden'))
          $("#notification_success").fadeIn("slow").html('Successfully created.').delay(1000).fadeOut('slow');

        $state.go("app.users");
      }, function(err) {
        if ($("#notification").is(':hidden'))
          $("#notification").fadeIn("slow").html("Something went wrong.").delay(1000).fadeOut('slow');
      });
    }
  }
}]);