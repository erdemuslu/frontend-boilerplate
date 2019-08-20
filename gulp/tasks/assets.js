const gulp = require('gulp');

// import paths
const { assets: { src, dest } } = require('../config');

const assets = () => (
  gulp.src(src)
    .pipe(gulp.dest(dest))
);

module.exports = assets;
