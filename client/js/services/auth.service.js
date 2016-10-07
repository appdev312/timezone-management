'use strict';

angular.module('app')
  .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
    var currentUser = {};
    
    var getCurrentUserP = function(){
      if ($cookieStore.get('user_info')) {
        currentUser = JSON.parse($cookieStore.get('user_info'));
      }

      return currentUser;
    }

    var setCurrentUserP = function(usr){
      currentUser = usr;

      if(currentUser.hasOwnProperty('$promise')) {
        currentUser.$promise.then(function() {
          $cookieStore.put('user_info', JSON.stringify(currentUser));
        });
      } else if(currentUser.hasOwnProperty('role')) {
        $cookieStore.put('user_info', JSON.stringify(currentUser));
      } else {
        $cookieStore.remove('user_info');
      }
    }

    if ($cookieStore.get('token')) {
      setCurrentUserP(User.get());
    }

    return {

      /*
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login credential
       * @param  {Function} callback - optional
       *
      */
      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
          $cookieStore.put('token', data.token);
          setCurrentUserP(User.get());
          deferred.resolve(data);

          return cb();
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);

          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
      */
      logout: function() {
        $cookieStore.remove('token');
        setCurrentUserP({});
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       *
      */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;

        return User.save(user,
          function(data) {
            $cookieStore.put('token', data.token);
            setCurrentUserP(User.get());

            return cb(user);
          },

          function(err) {
            this.logout();

            return cb(err);
          }.bind(this)).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       *
      */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({}, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Change user settings
       *
       * @param  {Object}   data
       * @param  {Function} callback    - optional
       *
      */
      updateProfile: function(data, callback) {
        var cb = callback || angular.noop;

        return User.updateProfile({ }, data, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
      */
      getCurrentUser: function() {
        return getCurrentUserP();
      },

      /**
       * Sets current user
       *
       * @param {Object} user
      */
      setCurrentUser: function(user) {
        setCurrentUserP(JSON.parse(JSON.stringify(user)));
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
      */
      isLoggedInAsync: function(cb) {
        if(getCurrentUserP().hasOwnProperty('$promise')) {
          getCurrentUserP().$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if(getCurrentUserP().hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
      */
      isLoggedIn: function() {
        return getCurrentUserP().hasOwnProperty('role');
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
      */
      isAdmin: function() {
        return getCurrentUserP().role === 'admin';
      },

      /**
       * Check if a user is an user manager
       *
       * @return {Boolean}
      */
      isUserManager: function() {
        return getCurrentUserP().role === 'manager';
      },

      canManageUsers: function(){
        return getCurrentUserP().role === 'admin'|| getCurrentUserP().role === 'manager';
      },

      canManageTimezones: function(){
        return getCurrentUserP().role === 'admin'|| getCurrentUserP().role === 'user';
      },
      
      /**
       * Get auth token
      */
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  });
