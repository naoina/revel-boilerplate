'use strict';

requirejs.config({
  paths: {
    'jquery': [
      '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min',
      '../bower_components/jquery/jquery.min'
    ]
  },
  shim: {
  }
});

require(['app']);
