const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-minify');
const connect = require('gulp-connect');

gulp.task('script', () => browserify({
  entries: ['./src/js/script.js'],
})
  .transform(babelify.configure({
    presets: ['@babel/preset-env'],
  }))
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({
    loadMaps: true,
  }))
  .pipe(sourcemaps.write('./'))
  .pipe(minify())
  .pipe(gulp.dest('build/script'))
  .pipe(connect.reload()));
