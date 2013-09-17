'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    requirejs: {
      build: {
        options: {
          almond: true,
          wrap: true,
          preserveLicenseComments: true,
          include: ['require_main'],
          insertRequire: ['require_main'],
          baseUrl: 'app/assets/js/',
          paths: {
            'jquery': '../bower_components/jquery/jquery',
            'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap'
          },
          out: 'public/js/app.min.js'
        }
      }
    },

    sass: {
      build: {
        options: {
          includePaths: ['app/assets/css/']
        },
        files: [{
          expand: true,
          cwd: 'app/assets/css/',
          src: ['**/*.scss'],
          dest: 'public/css/',
          ext: '.css'
        }]
      }
    },

    autoprefixer: {
      build: {
        options: {
          browsers: ['last 2 version']
        },
        files: [{
          expand: true,
          cwd: 'public/css/',
          src: ['**/*.css'],
          dest: 'public/css/'
        }]
      }
    },

    cssmin: {
      // pre-configured for usemin
    },

    concat: {
      // pre-configured for usemin
    },

    imagemin: {
      build: {
        files: [{
          expand: true,
          cwd: 'app/assets/img',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'public/img/'
        }]
      }
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: 'app/assets/bower_components/font-awesome/font/',
          src: ['**'],
          dest: 'public/font/'
        }]
      }
    },

    useminPrepare: {
      html: 'app/views/header.html',
      options: {
        dest: '.'
      }
    },
    usemin: {
      html: 'app/views/header.html'
    },

    watch: {
      script: {
        files: ['app/assets/js/**/*.js'],
        options: {
          nospawn: true,
          livereload: true
        }
      },
      css: {
        files: ['app/assets/css/**/*.scss'],
        tasks: ['sass', 'autoprefixer'],
        options: {
          livereload: true
        }
      }
    },

    clean: ['public/*']
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', [
    'sass',
    'autoprefixer',
    'imagemin',
    'watch'
  ]);
  grunt.registerTask('build', [
    'clean',
    'copy',
    'useminPrepare',
    'requirejs',
    'sass',
    'autoprefixer',
    'concat',
    'cssmin',
    'imagemin',
    'usemin'
  ]);
};
