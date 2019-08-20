const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-minify');

// import paths
const { script: { src, dest } } = require('../config');

const script = () => (
  browserify({
    entries: [src],
  })
    .transform(babelify.configure({
      presets: ['@babel/preset-env'],
    }))
    .bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true,
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(minify())
    .pipe(gulp.dest(dest))
);

module.exports = script;
