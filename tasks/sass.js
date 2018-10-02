const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const merge = require('merge-stream');

gulp.task('sass', () => {
  const plugins = [
    autoprefixer({ browsers: ['last 1 version'], cascade: false }),
    cssnano(),
  ];

  const cssStream = gulp.src(['./bower_components/normalize.css/normalize.css'])
    .pipe(concat('css-file.css'));

  const scssStream = gulp.src(['src/scss/style.scss'])
    .pipe(sass())
    .pipe(concat('scss-file.scss'));

  const mergedStream = merge(cssStream, scssStream)
    .pipe(concat('bundle.css'))
    .pipe(postcss(plugins))
    .pipe(gulp.dest('build/style'));

  return mergedStream;
});
