module.exports = function( grunt ) {

  grunt.initConfig( {

    pkg: grunt.file.readJSON( 'package.json' ),

    jshint: {
      options: {
        reporter: require( 'jshint-stylish' ),
      },
      dev: [ 'Gruntfile.js', './server/*.js', './server/**/*.js', './test/**/*.js' ],
      production: [ 'Gruntfile.js', './server/*.js', 'server/**/*.js', './public/**/*.js' ],
    },

    bower: {
      dev: {
        options: {
          targetDir: './test/lib'
        },
      },
      production: {
        options: {
          targetDir: './public/lib'
        },
      },
    },

    watch: {
      scripts: {
        files: [
          'server/*.js',
          'server/**/*.js',
          'client/*',
        ],
        tasks: [
          'copy:dev',
          'jshint:dev',
        ]
      }
    },

    copy: {
      dev: {
        files: [
          { expand: true,
            cwd: 'client/',
            src: ['**'],
            dest: 'test/',
            filter: 'isFile'
          },
        ],
      },
      production: {
        files: [
          { expand: true,
            cwd: 'client/',
            src: ['**'],
            dest: 'public/',
            filter: 'isFile'
          },
        ],
      },
    },

  });

  grunt.loadNpmTasks( 'grunt-notify' );
  grunt.loadNpmTasks( 'grunt-contrib-copy' );
  grunt.loadNpmTasks( 'grunt-injector' );
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-bower-task' );

  grunt.registerTask( 'nodemon', function () {

    var path = require( 'path' );
    var curDir = path.resolve( process.cwd() );

    grunt.util.spawn( {
      cmd: 'nodemon',
      opts: {
        cwd: curDir,
        stdio: 'inherit',
      }
    });
  });

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('dev', ['copy:dev', 'jshint:dev', 'bower:dev', 'nodemon']);
  grunt.registerTask('production', ['copy:production', 'jshint:production', 'bower:production', 'nodemon']);
};