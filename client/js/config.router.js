'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams', '$localStorage', 
      function ($rootScope,   $state,   $stateParams, $localStorage) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider', '$httpProvider', 'JQ_CONFIG', 'MODULE_CONFIG', 
      function ($stateProvider,   $urlRouterProvider, $httpProvider, JQ_CONFIG, MODULE_CONFIG) {
        $urlRouterProvider.otherwise('/app/profile');
        $httpProvider.interceptors.push('authInterceptor');

        $stateProvider
          .state('app', {
              abstract: true,
              url: '/app',
              controller: 'AppCtrl', 
              templateUrl: "tpl/app.html"
          })
          .state('app.profile', {
            url: '/profile',
            templateUrl: 'tpl/page_profile.html',
            resolve: load( ['js/controllers/profile.controller.js'] ),
            authenticate: true
          })
          .state('app.users', {
            url: '/users',
            templateUrl: 'tpl/page_users.html',
            resolve: load( ['js/controllers/users.controller.js'] ),
            authenticate: true,
            req_admin_manager_role: true
          })
          .state('app.edituser', {
            url: '/user/:id',
            templateUrl: 'tpl/page_edituser.html',
            resolve: load( ['js/controllers/users.controller.js'] ),
            authenticate: true,
            req_admin_manager_role: true
          })
          .state('app.timezones', {
            url: '/timezones',
            templateUrl: 'tpl/page_timezones.html',
            resolve: load( ['js/controllers/timezones.controller.js'] ),
            authenticate: true,
            req_admin_user_role: true
          })
          .state('app.edittimezone', {
            url: '/timezone/:id',
            templateUrl: 'tpl/page_edittimezone.html',
            resolve: load( ['js/controllers/timezones.controller.js'] ),
            authenticate: true,
            req_admin_user_role: true
          })
          .state('access', {
            url: '/access',
            template: '<div ui-view class="fade-in-right-big smooth"></div>'
          })
          .state('access.login', {
            url: '/login',
            templateUrl: 'tpl/page_login.html',
            resolve: load( ['js/controllers/login.controller.js'] )
          })
          .state('access.signup', {
            url: '/signup',
            templateUrl: 'tpl/page_signup.html',
            resolve: load( ['js/controllers/signup.controller.js'] )
          });

        function load(srcs, callback) {
          return {
              deps: ['$ocLazyLoad', '$q',
                function( $ocLazyLoad, $q ){
                  var deferred = $q.defer();
                  var promise  = false;
                  srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                  if(!promise){
                    promise = deferred.promise;
                  }
                  angular.forEach(srcs, function(src) {
                    promise = promise.then( function(){
                      if(JQ_CONFIG[src]){
                        return $ocLazyLoad.load(JQ_CONFIG[src]);
                      }
                      angular.forEach(MODULE_CONFIG, function(module) {
                        if( module.name == src){
                          name = module.name;
                        }else{
                          name = src;
                        }
                      });
                      return $ocLazyLoad.load(name);
                    } );
                  });
                  deferred.resolve();
                  return callback ? promise.then(function(){ return callback(); }) : promise;
              }]
          }
        }
      }
    ]
  );
