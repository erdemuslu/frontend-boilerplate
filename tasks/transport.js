const gulp = require('gulp');

gulp.task('transport', () => gulp.src('src/assets/**/*')
  .pipe(gulp.dest('build/')));
