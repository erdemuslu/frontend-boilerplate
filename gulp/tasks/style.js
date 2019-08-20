const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// import paths
const { style: { src, dest } } = require('../config');

const style = () => (
  gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(postcss([
      autoprefixer({ Browserslist: ['last 2 versions', 'ie >= 9'] }),
      cssnano(),
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream())
);

module.exports = style;
