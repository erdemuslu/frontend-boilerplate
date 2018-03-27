var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    browserify = require('gulp-browserify'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    merge = require('merge-stream'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    injectPartials = require('gulp-inject-partials'),
    pug = require('gulp-pug');

var sourcePath = {
    sassSource: 'src/scss/**/*',
    jsSource: 'src/js/**/*',
    imgSource: 'src/img/**/*',
    pugSource: 'src/view/*.pug'
}

var appPath = {
    root: 'app/',
    css: 'app/css',
    js: 'app/js',
    img: 'app/img'
}

gulp.task('clean-script', function() {
    return gulp.src(appPath.js + '/*.js', {read: false, force: true})
        .pipe(clean());
});

gulp.task('view', function () {
    return gulp.src(sourcePath.pugSource)
        .pipe(pug({
            doctype: 'html',
            pretty: false
        }))
        .pipe(gulp.dest('./app/'));
});

gulp.task('script', ['clean-script'], function() {
    return gulp.src(sourcePath.jsSource)
        .pipe(concat('app.js'))
        .pipe(browserify())        
        .pipe(gulp.dest(appPath.js))
});

gulp.task('sass', function() {
    var bootstrapCSS = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css'),
        sassFiles;

    sassFiles = gulp.src(sourcePath.sassSource)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        return merge(bootstrapCSS, sassFiles)
            .pipe(concat('app.css'))
            .pipe(gulp.dest(appPath.css));
});

gulp.task('images', function () {
    return gulp.src(sourcePath.imgSource)
        .pipe(newer(appPath.img))
        .pipe(imagemin())
        .pipe(gulp.dest(appPath.img));
});

gulp.task('watch', function () {
    gulp.watch(sourcePath.sassSource, ['sass']);
    gulp.watch(['src/view/**/*', sourcePath.pugSource], ['view']);
    gulp.watch(sourcePath.jsSource, ['script']);
    gulp.watch(sourcePath.imgSource, ['images']);

    // init server
    browserSync.init({
        server: {
            proxy: "local.build",
            baseDir: appPath.root
        }
    });

    gulp.watch([appPath.root + '**'], browserSync.reload);
});

gulp.task('default', ['watch']);