const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const merge = require('merge-stream');
const minify = require('gulp-minify-css');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const pug = require('gulp-pug');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const connect = require('gulp-connect');

const sourcePath = {
  sassSource: 'src/scss/**/*',
  jsSource: 'src/js/**/*',
  imgSource: 'src/img/**/*',
  pugSource: 'src/views/*.pug',
  fontSource: 'src/fonts/**/*',
  attachmentsSource: 'src/assets/**/*',
};

const appPath = {
  root: 'app/',
  css: 'app/css',
  js: 'app/js',
  img: 'app/img',
  attachmentsSource: 'app/',
};

gulp.task('clean-script', () => gulp.src(`${appPath.js}/*.js`, {
  read: false,
  force: true,
}).pipe(clean()));

gulp.task('clean-html', () => gulp.src(`${appPath.root}/*.html`, { read: false, force: true })
  .pipe(clean()));

gulp.task('clean-css', () => gulp.src(`${appPath.css}/*.css`, { read: false, force: true })
  .pipe(clean()));

gulp.task('views', ['clean-html'], () => gulp.src(sourcePath.pugSource)
  .pipe(pug({
    doctype: 'html',
    pretty: false,
  }))
  .pipe(gulp.dest('./app/')));

gulp.task('script', () => browserify({
  entries: ['./src/js/script.js'],
})
  .transform(babelify.configure({
    presets: ['env'],
  }))
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(appPath.js))
  .pipe(connect.reload()));

gulp.task('sass', () => {
  const cssStream = gulp.src(
    [
      './bower_components/tiny-slider/dist/tiny-slider.css',
    ],
  )
    .pipe(concat('css-files.css'));

  const scssStream = gulp.src([sourcePath.sassSource])
    .pipe(sass())
    .pipe(concat('scss-files.scss'));

  const mergedStream = merge(cssStream, scssStream)
    .pipe(concat('style.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(minify())
    .pipe(gulp.dest(appPath.css));

  return mergedStream;
});

gulp.task('images', () => gulp.src(sourcePath.imgSource)
  .pipe(newer(appPath.img))
  .pipe(imagemin())
  .pipe(gulp.dest(appPath.img)));

gulp.task('move', () => gulp.src(sourcePath.attachmentsSource)
  .pipe(gulp.dest(appPath.attachmentsSource)));

gulp.task('setup', ['sass', 'images', 'views', 'script', 'move']);

gulp.task('watch', () => {
  gulp.watch(sourcePath.sassSource, ['sass']);
  gulp.watch(['src/views/**/*', sourcePath.pugSource], ['views']);
  gulp.watch(sourcePath.jsSource, ['script']);
  gulp.watch(sourcePath.imgSource, ['images']);
  gulp.watch(sourcePath.attachmentsSource, ['move']);

  // init server
  browserSync.init({
    server: {
      proxy: 'local.build',
      baseDir: appPath.root,
    },
  });

  gulp.watch([`${appPath.root}**`], browserSync.reload);
});

gulp.task('default', ['watch']);
