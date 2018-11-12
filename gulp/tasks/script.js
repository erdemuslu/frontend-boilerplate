// import packages
const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-minify');

// import paths
const paths = require('../config/paths');

const script = () => (
  browserify({
    entries: [paths.script.src],
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
    .pipe(gulp.dest(paths.script.dest))
);

module.exports = script;
