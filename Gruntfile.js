module.exports = function(grunt) {

  grunt.initConfig({

    copy: {
      main: {
          files: [
              {
                  expand: true,
                  flatten: true,
                  src: ['node_modules/angular-material/angular-material.css',
                        'node_modules/angular-material-data-table/dist/md-data-table.min.css',
                        'node_modules/material-design-icons/iconfont/material-icons.css', 
                        'node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff',
                        'node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff2',
                        'node_modules/material-design-icons/iconfont/MaterialIcons-Regular.ttf'],
                  dest: 'assets/css/'
              },
              {
                  expand: true,
                  flatten: true,
                  src: ['node_modules/angular/angular.js',
                        'node_modules/angular-animate/angular-animate.js',
                        'node_modules/angular-aria/angular-aria.js',
                        'node_modules/angular-material/angular-material.js',
                        'node_modules/angular-material-data-table/dist/md-data-table.min.js',
                        'node_modules/angular-messages/angular-messages.js',
                        'node_modules/angular-cookies/angular-cookies.js',
                        'node_modules/angular-route/angular-route.js',
                        'node_modules/angular-sanitize/angular-sanitize.js',
                        'node_modules/angular-resource/angular-resource.js'],
                  dest: 'assets/libs/'
              },
              {
                  expand: true,
                  flatten: true,
                  src: ['node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg',
                        'node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg',
                        'node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg', 
                        'node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg',
                        'node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-av.svg'],
                  dest: 'assets/svg/'
              },
          ]
      }
    }, // copy files

  });

  // Grunt's plugins 
  grunt.loadNpmTasks( 'grunt-contrib-copy' );

  // generate production
  grunt.registerTask( 'production', [ 'copy' ] );

};