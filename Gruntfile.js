module.exports = function( grunt ) {

  grunt.initConfig( {

    pkg: grunt.file.readJSON( 'package.json' ),

    express: {
      options: {
      },
      dev: {
        options: {
          port: 8000,
          script: 'server/server.js',
        }
      },
      production: {
        options: {
          port: 8000,
          script: 'server/server.js',
          node_env: 'production',
        }
      },
    },

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
          targetDir: './test/lib',
          production: false,
        },
      },
      production: {
        options: {
          targetDir: './public/lib',
          production: true,
        },
      },
    },

    injector: {
      options: {
        addRootSlash: false,
      },
      dev: {
        options: {
          destFile : 'test/index.html',
          ignorePath : 'test/',
        },
        files: [ {
          expand: true,
          cwd: 'test/',
          dest: 'test/',
          src: [ 'css/*.css', 'lib/**/*.js', 'lib/**/*.css',
            'app/*.js', 'app/**/*.js' ],
        }, ],
      },
      production: {
        options: {
          destFile : 'public/index.html',
          ignorePath : 'public/',
        },
        files: [ {
          expand: true,
          cwd: 'public/',
          dest: 'public/',
          src: [ 'css/*.css', 'lib/**/*.js', 'lib/**/*.css',
            'app/*.js', 'app/**/*.js' ],
        }, ],
      },
    },

    watch: {
      options: {
        livereload: true,
        //atBegin: true,
      },
      express: {
        files:  [ 'server/*.js', 'server/**/*.js' ],
        tasks:  [ 'dev_build', 'express:dev' ],
        options: {
          spawn: false,
        }
      },
    },

    clean: {
      dev: [ "test" ],
      production: [ "public" ]
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
  grunt.loadNpmTasks( 'grunt-contrib-clean' );
  grunt.loadNpmTasks( 'grunt-express-server' );

  grunt.registerTask( 'default', [ 'dev' ] );
  grunt.registerTask( 'dev_build', [ 'clean:dev', 'copy:dev', 'jshint:dev', 'bower:dev', 'injector:dev' ] );
  grunt.registerTask( 'dev', [ 'dev_build', 'express:dev', 'watch:express' ] );
  grunt.registerTask( 'production', [ 'clean:production', 'copy:production', 'jshint:production', 'bower:production', 'express:production' ] );
};