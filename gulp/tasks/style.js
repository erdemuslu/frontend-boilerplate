// import packages
const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// import paths
const paths = require('../config/paths');

const style = () => (
  gulp.src(paths.style.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(postcss([autoprefixer({ browsers: ['last 1 version'] }), cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.style.dest))
    .pipe(browserSync.stream())
);

module.exports = style;
