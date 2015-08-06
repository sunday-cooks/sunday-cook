module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: [
        './server/*.js',
        './server/*/*.js',
        './client/*/*.js'
      ],
    },

    watch: {
      scripts: {
        files: [
          'server/*.js',
          'server/*/*.js'
        ],
        tasks: [
          'jshint',
          'mochaTest'
        ]
      }
    },

  });

  grunt.loadNpmTasks('grunt-notify');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('nodemon', function() {

    var path = require('path');
    var curDir = path.resolve(process.cwd());

    grunt.util.spawn({
      cmd: 'nodemon',
      opts: {
        cwd: curDir,
        stdio: 'inherit',
      }
    });
  });


  grunt.registerTask('default', ['jshint', 'watch']);
  grunt.registerTask('dev', ['jshint', 'nodemon']);
};