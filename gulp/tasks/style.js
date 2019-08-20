const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const mode = require('gulp-mode')();
const browserSync = require('browser-sync').create();

// import paths
const { style: { src, dest } } = require('../config');

const style = () => (
  gulp.src(src)
    .pipe(mode.production(sourcemaps.init()))
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(postcss([
      autoprefixer({ Browserslist: ['last 2 versions', 'ie >= 9'] }),
    ]))
    .pipe(mode.development(cleanCSS()))
    .pipe(mode.production(sourcemaps.write()))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream())
);

module.exports = style;
