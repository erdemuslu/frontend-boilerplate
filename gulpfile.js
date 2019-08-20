// import packages
const gulp = require('gulp');
const browserSync = require('browser-sync').create();

// import tasks
const style = require('./gulp/tasks/style');
const script = require('./gulp/tasks/script');
const template = require('./gulp/tasks/template');
const assets = require('./gulp/tasks/assets');
const clean = require('./gulp/tasks/clean');

// import paths
const paths = require('./gulp/config');

// define tasks
exports.style = style;
exports.script = script;
exports.template = template;
exports.assets = assets;
exports.clean = clean;

// browserSync
function sync(done) {
  browserSync.init({
    server: {
      baseDir: './build',
    },
    port: 3000,
  });
  done();
}

// browserSync reload
function reload(done) {
  browserSync.reload();
  done();
}

// watch config
function watchFiles() {
  // task worker
  gulp.watch(paths.style.watch, style);
  gulp.watch(paths.script.watch, script);
  gulp.watch(paths.template.watch, template);
  gulp.watch(paths.assets.src, assets);

  // reload worker
  gulp.watch([paths.base.src], gulp.series(reload));
}

// define watch task
gulp.task('watch', gulp.parallel(watchFiles, sync));

// build config
const build = gulp.series(clean, gulp.parallel(style, script, template, assets));

// define build task
gulp.task('build', build);

// define default task
gulp.task('default', build);
