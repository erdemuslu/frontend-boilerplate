const gulp = require('gulp');
const browserSync = require('browser-sync');

function reload(done) {
  browserSync.reload();
  done();
}

gulp.task('watch', () => {
  // init server
  browserSync.init({
    server: {
      proxy: 'local.build',
      baseDir: 'build/',
    },
  });

  gulp.watch('src/scss/**/*', gulp.series('sass', reload));
  gulp.watch('src/js/**/*', gulp.series('script', reload));
  gulp.watch(['src/views/**/*'], gulp.series('views', reload));
  gulp.watch('src/assets/**/*', gulp.series('transport', reload));
});
