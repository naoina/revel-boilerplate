'use strict';

requirejs.config({
  paths: {
    'jquery': [
      '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min',
      '../bower_components/jquery/jquery.min'
    ],
    'bootstrap': [
      '//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min',
      '../bower_components/bootstrap/dist/js/bootstrap.min'
    ]
  },
  shim: {
    'bootstrap': ['jquery']
  }
});

require(['jquery'], function () {
  require(['bootstrap', 'app']);
});
