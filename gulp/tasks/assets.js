// import packages
const gulp = require('gulp');

// import paths
const paths = require('../config/paths');

const assets = () => (
  gulp.src(paths.assets.src)
    .pipe(gulp.dest(paths.assets.dest))
);

module.exports = assets;
