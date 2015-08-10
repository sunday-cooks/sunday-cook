var path = require('path');

module.exports = function( grunt ) {

  grunt.initConfig( {

    pkg: grunt.file.readJSON( 'package.json' ),

    express: {
      dev: {
        options: {
          script: 'server/server.js',
        }
      },
      production: {
        options: {
          background: false,
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
          targetDir: './test/',
          production: false,
          layout: function(type, component, source) {
            console.log('Found component', component, 'at', source);
            return path.parse(source).dir;
          }
        },
      },
      production: {
        options: {
          targetDir: './public/',
          production: true,
          layout: function(type, component, source) {
            return path.parse(source).dir;
          }
        },
      },
    },

    injector: {
      options: {
        //addRootSlash: false,
        bowerPrefix: 'bower:',
      },
      dev: {
        options: {
          destFile : 'test/index.html',
          ignorePath : [ 'test' ],
        },
        files: [ {
          expand: true,
          cwd: 'test/',
          dest: 'test/',
          src: [ '../bower.json', 'app/*.js', 'app/**/*.js', 'styles/**/*.css' ],
        }, ],
      },
      production: {
        options: {
          destFile : 'public/index.html',
          ignorePath : [ 'public/' ],
        },
        files: [ {
          expand: true,
          cwd: 'public/',
          dest: 'public/',
          src: [ '../bower.json', 'app/*.js', 'app/**/*.js', 'styles/**/*.css' ],
        }, ],
      },
    },

    watch: {
      options: {
        livereload: true,
        //atBegin: true,
      },
      express: {
        files:  [ 'server/*.js', 'server/**/*.js', 'client/**' ],
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

  sass: {
    dev: {
      files: [{
        expand: true,
        cwd: 'lib/',
        src: ['*.scss'],
        dest: 'test/',
        ext: '.css'
      }, {
        expand: true,
        cwd: 'client/styles/',
        src: ['*.scss'],
        dest: 'test/',
        ext: '.css'
      }],
    },
    production: {
      files: [{
        expand: true,
        cwd: 'lib/',
        src: ['*.scss'],
        dest: 'public/',
        ext: '.css'
      }, {
        expand: true,
        cwd: 'client/styles/',
        src: ['*.scss'],
        dest: 'public/',
        ext: '.css'
      }],
    },
  }

  });

  grunt.loadNpmTasks( 'grunt-notify' );
  grunt.loadNpmTasks( 'grunt-contrib-copy' );
  grunt.loadNpmTasks( 'grunt-injector' );
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-bower-task' );
  grunt.loadNpmTasks( 'grunt-contrib-clean' );
  grunt.loadNpmTasks( 'grunt-express-server' );
  grunt.loadNpmTasks( 'grunt-contrib-sass' );

  grunt.registerTask( 'default', [ 'dev' ] );
  grunt.registerTask( 'dev_build', [ 'clean:dev', 'copy:dev', 'jshint:dev', 'bower:dev', 'sass:dev', 'injector:dev' ] );
  grunt.registerTask( 'dev', [ 'dev_build', 'express:dev', 'watch:express' ] );
  grunt.registerTask( 'prod_build', [ 'clean:production', 'copy:production', 'jshint:production', 'bower:production', 'sass:production', 'injector:production' ] );
  grunt.registerTask( 'prod', [ 'prod_build', 'express:production' ] );
};
