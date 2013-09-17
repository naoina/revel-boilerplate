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
        tasks: ['sass'],
        options: {
          livereload: true
        }
      }
    },

    clean: ['public/*']
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', [
    'clean',
    'copy',
    'useminPrepare',
    'requirejs',
    'sass',
    'concat',
    'cssmin',
    'imagemin',
    'usemin'
  ]);
};
