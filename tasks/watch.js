const gulp = require('gulp');
const browserSync = require('browser-sync');

gulp.task('watch', () => {
  gulp.watch('src/scss/**/*', gulp.series('sass'));
  gulp.watch('src/js/**/*', gulp.series('script'));
  gulp.watch(['src/views/**/*', 'src/views/*.pug'], gulp.series('views'));
  gulp.watch('src/assets/**/*', gulp.series('transport'));

  // init server
  browserSync.init({
    server: {
      proxy: 'local.build',
      baseDir: 'build/',
    },
  });

  gulp.watch(['build/**'], browserSync.reload);
});
