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
            'jquery': 'empty:'
          },
          out: 'public/assets/app.min.js'
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
          src: '**/*.scss',
          dest: 'public/assets/'
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
          dest: 'public/assets/'
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
        tasks: ['sass'],
        options: {
          livereload: true
        }
      }
    },

    clean: ['public/assets/']
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', [
    'clean',
    'useminPrepare',
    'requirejs',
    'sass',
    'concat',
    'cssmin',
    'imagemin',
    'usemin'
  ]);
};
