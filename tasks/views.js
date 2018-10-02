const gulp = require('gulp');
const pug = require('gulp-pug');
const clean = require('gulp-clean');

gulp.task('clean-html', () => gulp.src('build/*.html', {
  read: false,
  force: true,
})
  .pipe(clean()));

gulp.task('views', gulp.series('clean-html', () => gulp.src('src/views/*.pug')
  .pipe(pug({
    doctype: 'html',
    pretty: false,
  }))
  .pipe(gulp.dest('build/'))));
