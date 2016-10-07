/* Controllers */
app.filter('time', function($filter)
{
  return function(input)
  {
    if(input == null){ return ""; } 
    var _date = $filter('date')(new Date(input), 'hh:mm:ss a');

    return _date.toUpperCase();
  };
});

app.controller('tzListCtrl', ['$q', '$scope', '$http', '$state', '$localStorage', 'Timezone', 'Auth', 'User', 
                      function($q ,  $scope ,  $http ,  $state ,  $localStorage ,  Timezone ,  Auth ,  User) {

  $scope.users = {};
  $scope.timezones = [];
  $scope.showUsersCol = Auth.isAdmin();
  $scope.tzFilterKey = "";
  $scope.nameFilter = "";

  // Async tasks
  $q.when()
    .then(function () {
      var deferred = $q.defer();
      
      if ($scope.showUsersCol)
      {
        User.list(function(data) {
          for (var i = 0; i < data.length; i ++)
          {
            $scope.users[data[i]._id] = data[i];
          }

          deferred.resolve();
        });
      }else{
        $scope.users[Auth.getCurrentUser()._id] = Auth.getCurrentUser();
        deferred.resolve();
      }

      return deferred.promise;
    })
    .then(function () {
      Timezone.get(function(data) {
        for (var i = 0; i < data.length; i ++)
        {
          data[i].curTime = currentTime(data[i].differenceToGMT);
          $scope.timezones.push(data[i]);
        }
      });
    });

  $scope.$watch('timezones', function() {
    $('.footable').trigger('footable_redraw');
  }, true);

  $scope.tzFilter = function (item) {
    var ownerFilter = true;
    if ($scope.tzFilterKey && $scope.tzFilterKey !== "")
    {
      ownerFilter = ( item.userId == $scope.tzFilterKey );
    }

    ownerFilter = ownerFilter & ((item.name.toLowerCase().indexOf($scope.nameFilter.toLowerCase()) >= 0) ||
                                  (item.nameOfCity.toLowerCase().indexOf($scope.nameFilter.toLowerCase()) >= 0));

    return ownerFilter;
  };

  $scope.removeTZ = function(id)
    {
      if (confirm("Do you really want to remove the note?"))
      {
        for (var i = 0; i < $scope.timezones.length; i ++)
        {
          if ($scope.timezones[i]._id == id)
          {
            Timezone.delete({id: id}, function(data) {
              if ($("#notification_success").is(':hidden'))
                $("#notification_success").fadeIn("slow").html('Successfully deleted.').delay(1000).fadeOut('slow');
              delete $scope.timezones.splice(i, 1);
            }, function(err){
              if ($("#notification").is(':hidden'))
                $("#notification").fadeIn("slow").html('Not found.').delay(1000).fadeOut('slow');
              if (err.status == 404) delete $scope.timezones.splice(i, 1);
            });
            
            break;
          }
        }
      }
    }

    $scope.editTZ = function(id)
    {
      $state.go("app.edittimezone", {id: id});
    }

    function pad(n) {
      return (n < 10) ? ("0" + n) : n;
    }

    $scope.showDIFF = function(diff){
      if (diff >= 0)
        return "GMT + " + pad(parseInt(diff * 60 / 60)) + ":" + pad((diff * 60 % 60));
      else
      {
        diff = -diff;
        return "GMT - " + pad(parseInt(diff * 60 / 60)) + ":" + pad((diff * 60 % 60));
      }
    }

    var currentTime = function(diff){
      var now = new Date();
      return new Date(now.getTime() + now.getTimezoneOffset() * 60 * 1000 + diff * 60 * 60 * 1000);
    }
}]);

app.controller('tzEditCtrl', ['$q', '$stateParams', '$scope', '$http', '$state', '$localStorage', 'Auth', 'User', 'Timezone', 
                    function ( $q ,  $stateParams ,  $scope ,  $http ,  $state ,  $localStorage ,  Auth ,  User ,  Timezone) {

  $scope.showUsersCol = Auth.isAdmin();
  $scope.isEdit = false;
  
  $scope.editentry = {userId: Auth.getCurrentUser()._id};
  $scope.users = [];

  if ($stateParams.id !== ""){
    $scope.isEdit = true;
  }

  $q.when()
    .then(function () {
      var deferred = $q.defer();
      
      if ($scope.showUsersCol){
        User.list(function(data) {
          for (var i = 0; i < data.length; i ++)
            $scope.users.push(data[i]);

          deferred.resolve();
        });
      }else{
        deferred.resolve();
      }

      return deferred.promise;
    })
    .then(function () { 
      if ($scope.isEdit){
        Timezone.getItem({ id: $stateParams.id}, function(note) {
          var params = ["userId", "name", "nameOfCity", "differenceToGMT"];
          for (var par in params)
            $scope.editentry[params[par]] = note[params[par]];
        }, function(err){
          if ($("#notification").is(':hidden'))
            $("#notification").fadeIn("slow").html("Not found.").delay(1000).fadeOut('slow');
          $state.go("app.timezones");
        });
      }
    });

  $scope.cancel = function(){
    $state.go("app.timezones");
  }

  $scope.save = function(){
    if ($scope.isEdit)
    {
      Timezone.update({ id: $stateParams.id }, $scope.editentry, function(data) {
        if ($("#notification_success").is(':hidden'))
          $("#notification_success").fadeIn("slow").html('Successfully updated.').delay(1000).fadeOut('slow');
      }, function(err){
        if ($("#notification").is(':hidden'))
          $("#notification").fadeIn("slow").html("Something went wrong.").delay(1000).fadeOut('slow');
      });
    }else{
      Timezone.new($scope.editentry, function(data) {
        if ($("#notification_success").is(':hidden'))
          $("#notification_success").fadeIn("slow").html('Successfully created.').delay(1000).fadeOut('slow');
        $state.go("app.timezones");
      }, function(err){
        if ($("#notification").is(':hidden'))
          $("#notification").fadeIn("slow").html("Something went wrong.").delay(1000).fadeOut('slow');
      });
    }
  }
}]);