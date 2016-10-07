// lazyload config

angular.module('app')
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
      easyPieChart:   [   '../libs/jquery.easy-pie-chart/dist/jquery.easypiechart.fill.js'],
      sparkline:      [   '../libs/jquery.sparkline/dist/jquery.sparkline.retina.js'],
      plot:           [   '../libs/flot/jquery.flot.js',
                          '../libs/flot/jquery.flot.pie.js', 
                          '../libs/flot/jquery.flot.resize.js',
                          '../libs/flot.tooltip/js/jquery.flot.tooltip.min.js',
                          '../libs/flot.orderbars/js/jquery.flot.orderBars.js',
                          '../libs/flot-spline/js/jquery.flot.spline.min.js'],
      moment:         [   '../libs/moment/moment.js'],
      screenfull:     [   '../libs/screenfull/dist/screenfull.min.js'],
      slimScroll:     [   '../libs/slimscroll/jquery.slimscroll.min.js'],
      sortable:       [   '../libs/html5sortable/jquery.sortable.js'],
      nestable:       [   '../libs/nestable/jquery.nestable.js',
                          '../libs/nestable/jquery.nestable.css'],
      filestyle:      [   '../libs/bootstrap-filestyle/src/bootstrap-filestyle.js'],
      slider:         [   '../libs/bootstrap-slider/bootstrap-slider.js',
                          '../libs/bootstrap-slider/bootstrap-slider.css'],
      chosen:         [   '../libs/chosen/chosen.jquery.min.js',
                          '../libs/chosen/bootstrap-chosen.css'],
      TouchSpin:      [   '../libs/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js',
                          '../libs/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'],
      wysiwyg:        [   '../libs/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                          '../libs/bootstrap-wysiwyg/external/jquery.hotkeys.js'],
      dataTable:      [   '../libs/datatables/media/js/jquery.dataTables.min.js',
                          '../libs/plugins/integration/bootstrap/3/dataTables.bootstrap.js',
                          '../libs/plugins/integration/bootstrap/3/dataTables.bootstrap.css'],
      vectorMap:      [   '../libs/bower-jvectormap/jquery-jvectormap-1.2.2.min.js', 
                          '../libs/bower-jvectormap/jquery-jvectormap-world-mill-en.js',
                          '../libs/bower-jvectormap/jquery-jvectormap-us-aea-en.js',
                          '../libs/bower-jvectormap/jquery-jvectormap.css'],
      footable:       [   '../libs/footable/dist/footable.all.min.js',
                          '../libs/footable/css/footable.core.css'],
      fullcalendar:   [   '../libs/moment/moment.js',
                          '../libs/fullcalendar/dist/fullcalendar.min.js',
                          '../libs/fullcalendar/dist/fullcalendar.css',
                          '../libs/fullcalendar/dist/fullcalendar.theme.css'],
      daterangepicker:[   '../libs/moment/moment.js',
                          '../libs/bootstrap-daterangepicker/daterangepicker.js',
                          '../libs/bootstrap-daterangepicker/daterangepicker-bs3.css'],
      tagsinput:      [   '../libs/bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
                          '../libs/bootstrap-tagsinput/dist/bootstrap-tagsinput.css']
                      
    }
  )
  .constant('MODULE_CONFIG', [
      {
          name: 'ngGrid',
          files: [
              '../libs/ng-grid/build/ng-grid.min.js',
              '../libs/ng-grid/ng-grid.min.css',
              '../libs/ng-grid/ng-grid.bootstrap.css'
          ]
      },
      {
          name: 'ui.grid',
          files: [
              '../libs/angular-ui-grid/ui-grid.min.js',
              '../libs/angular-ui-grid/ui-grid.min.css',
              '../libs/angular-ui-grid/ui-grid.bootstrap.css'
          ]
      },
      {
          name: 'ui.select',
          files: [
              '../libs/angular-ui-select/dist/select.min.js',
              '../libs/angular-ui-select/dist/select.min.css'
          ]
      },
      {
          name:'angularFileUpload',
          files: [
            '../libs/angular-file-upload/angular-file-upload.js'
          ]
      },
      {
          name:'ui.calendar',
          files: ['../libs/angular-ui-calendar/src/calendar.js']
      },
      {
          name: 'ngImgCrop',
          files: [
              '../libs/ngImgCrop/compile/minified/ng-img-crop.js',
              '../libs/ngImgCrop/compile/minified/ng-img-crop.css'
          ]
      },
      {
          name: 'angularBootstrapNavTree',
          files: [
              '../libs/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
              '../libs/angular-bootstrap-nav-tree/dist/abn_tree.css'
          ]
      },
      {
          name: 'toaster',
          files: [
              '../libs/angularjs-toaster/toaster.js',
              '../libs/angularjs-toaster/toaster.css'
          ]
      },
      {
          name: 'textAngular',
          files: [
              '../libs/textAngular/dist/textAngular-sanitize.min.js',
              '../libs/textAngular/dist/textAngular.min.js'
          ]
      },
      {
          name: 'vr.directives.slider',
          files: [
              '../libs/venturocket-angular-slider/build/angular-slider.min.js',
              '../libs/venturocket-angular-slider/build/angular-slider.css'
          ]
      },
      {
          name: 'com.2fdevs.videogular',
          files: [
              '../libs/videogular/videogular.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.controls',
          files: [
              '../libs/videogular-controls/controls.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.buffering',
          files: [
              '../libs/videogular-buffering/buffering.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.overlayplay',
          files: [
              '../libs/videogular-overlay-play/overlay-play.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.poster',
          files: [
              '../libs/videogular-poster/poster.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.imaads',
          files: [
              '../libs/videogular-ima-ads/ima-ads.min.js'
          ]
      },
      {
          name: 'xeditable',
          files: [
              '../libs/angular-xeditable/dist/js/xeditable.min.js',
              '../libs/angular-xeditable/dist/css/xeditable.css'
          ]
      },
      {
          name: 'smart-table',
          files: [
              '../libs/angular-smart-table/dist/smart-table.min.js'
          ]
      },
      {
          name: 'angular-skycons',
          files: [
              '../libs/angular-skycons/angular-skycons.js'
          ]
      }
    ]
  )
  // oclazyload config
  .config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function($ocLazyLoadProvider, MODULE_CONFIG) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:  false,
          events: true,
          modules: MODULE_CONFIG
      });
  }])
;
