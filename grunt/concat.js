module.exports = {
  angular:{
    src:[
      'client/libs/jquery/dist/jquery.js',

      'client/libs/angular/angular.js',     
      'client/libs/angular-animate/angular-animate.js',
      'client/libs/angular-aria/angular-aria.js',
      'client/libs/angular-cookies/angular-cookies.js',
      'client/libs/angular-messages/angular-messages.js',
      'client/libs/angular-resource/angular-resource.js',
      'client/libs/angular-sanitize/angular-sanitize.js',
      'client/libs/angular-touch/angular-touch.js',
      'client/libs/angularjs-toaster/toaster.js',
      'client/libs/angular-material/angular-material.js',
      'client/libs/angular-ui-router/release/angular-ui-router.js', 
      'client/libs/ngstorage/ngStorage.js',
      'client/libs/angular-ui-utils/ui-utils.js',
      'client/libs/angular-bootstrap/ui-bootstrap-tpls.js',
      'client/libs/oclazyload/dist/ocLazyLoad.js',
      
      'client/libs/angular-translate/angular-translate.js',
      'client/libs/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'client/libs/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
      'client/libs/angular-translate-storage-local/angular-translate-storage-local.js',

      'client/js/*.js',

      'client/js/directives/*.js',
      'client/js/services/*.js',
      'client/js/filters/*.js',
      'client/js/controllers/bootstrap.js'
    ],
    
    dest:'client/js/app.src.js'
  }
}
