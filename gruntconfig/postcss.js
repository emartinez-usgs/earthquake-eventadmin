'use strict';

var autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    calc = require('postcss-calc'),
    cssImport = require('postcss-import'),
    precss = require('precss');


var config = require('./config'),
    CWD = '.',
    NODE_MODULES = CWD + '/node_modules';


var postcss = {
  dev: {
    options: {
      map: true,
      processors: [
        cssImport({
          path: [
            config.src + '/htdocs/css',
            NODE_MODULES
          ]
        }),
        precss(),
        calc(),
        autoprefixer({'browsers': 'last 4 versions'}) // vendor prefix as needed
      ]
    },
    expand: true,
    cwd: config.src + '/htdocs',
    src: [
      '**/*.scss',
      '!**/_*.scss'
    ],
    dest: config.build + '/' + config.src + '/htdocs',
    ext: '.css',
    extDot: 'last'
  },

  dist: {
    cwd: config.build + '/' + config.src + '/htdocs',
    dest: config.dist + '/htdocs',
    expand: true,
    options: {
      processors: [
        cssnano({ // minify
          autoprefixer: false,
          zindex: false
        })
      ]
    },
    src: [
      '**/*.css'
    ]
  }
};


module.exports = postcss;