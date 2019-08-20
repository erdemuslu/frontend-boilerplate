// import packages
const gulp = require('gulp');
const pug = require('gulp-pug');

// import paths
const { template: { src, dest } } = require('../config');

const template = () => (
  gulp.src(src)
    .pipe(pug())
    .pipe(gulp.dest(dest))
);

module.exports = template;
