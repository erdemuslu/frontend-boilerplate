const fs = require('fs');
const gulp = require('gulp');

const tasks = fs.readdirSync('./tasks/');
tasks.forEach((task) => {
  require(`./tasks/${task}`); // eslint-disable-line import/no-dynamic-require
});

gulp.task('setup', gulp.series('sass', 'script', 'views', 'transport', (done) => {
  done();
}));

gulp.task('default', gulp.series('sass', (done) => {
  done();
}));
