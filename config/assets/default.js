'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        // 'public/lib/bootstrap/dist/css/bootstrap.css',
        // 'public/lib/bootstrap/dist/css/cosmo.bootstrap.min.css',
        // 'public/lib/bootstrap/dist/css/dark.bootstrap.min.css',
        // 'public/lib/bootstrap/dist/css/flatly.bootstrap.min.css',
        // 'public/lib/bootstrap/dist/css/journel.bootstrap.min.css',
        // 'public/lib/bootstrap/dist/css/lumen.bootstrap.min.css',
        // 'public/lib/bootstrap/dist/css/slate.bootstrap.min.css',
        // 'public/lib/bootstrap/dist/css/spacelab.bootstrap.min.css',
        // 'public/lib/bootstrap/dist/css/united.bootstrap.min.css',
         'public/lib/bootstrap/dist/css/yeti.bootstrap.min.css',
        // 'public/lib/bootstrap/dist/css/bootstrap-theme.css',
        'public/lib/datatables/media/css/jquery.dataTables.css'
      ],
      js: [
        'public/lib/jquery/dist/jquery.min.js',
        'public/lib/populate-form/jquery.populate.js',
        'public/lib/populate-form/populate-page-functions.js',
        'public/lib/jquery-datatables/jquery.dataTables.js',
        'public/lib/angular/angular.js',
        'public/lib/angular-datatables/dist/angular-datatables.min.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/angular-ui-utils/ui-utils.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/angular-file-upload/angular-file-upload.js',
        'public/lib/angular-file-saver/dist/angular-file-saver.bundle.min.js',
        'public/lib/angular-file-saver/dist/angular-file-saver.min.js',
        'public/lib/file-saver.js/FileSaver.js',
        'public/lib/js/Blob.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        'public/lib/js/multiselect.js',
        'public/lib/bootstrap/dist/js/bootstrap.min.js',
        'public/lib/ckeditor/ckeditor.js'
      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
    },
    css: [
      'modules/*/client/css/*.css'
    ],
    less: [
      'modules/*/client/less/*.less'
    ],
    sass: [
      'modules/*/client/scss/*.scss'
    ],
    js: [
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',
      'modules/*/client/*.js',
      'modules/*/client/**/*.js'
    ],
    views: ['modules/*/client/views/**/*.html'],
    templates: ['build/templates.js']
  },
  server: {
    gruntConfig: 'gruntfile.js',
    gulpConfig: 'gulpfile.js',
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'modules/*/server/models/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: 'modules/*/server/config/*.js',
    policies: 'modules/*/server/policies/*.js',
    views: 'modules/*/server/views/*.html'
  }
};
