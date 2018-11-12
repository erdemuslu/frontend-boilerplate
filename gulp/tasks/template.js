// import packages
const gulp = require('gulp');
const pug = require('gulp-pug');

// import paths
const paths = require('../config/paths');

const template = () => (
  gulp.src(paths.template.src)
    .pipe(pug())
    .pipe(gulp.dest(paths.template.dest))
);

module.exports = template;
