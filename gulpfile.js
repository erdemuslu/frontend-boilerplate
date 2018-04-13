var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    merge = require('merge-stream'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    pug = require('gulp-pug'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    connect = require('gulp-connect');

var sourcePath = {
    sassSource: 'src/scss/**/*',
    jsSource: 'src/js/**/*',
    imgSource: 'src/img/**/*',
    pugSource: 'src/views/*.pug',
    attachmentsSource: 'src/attachments/**/*'
}

var appPath = {
    root: 'app/',
    css: 'app/css',
    js: 'app/js',
    img: 'app/img',
    attachmentsSource: 'app/'
}

gulp.task('clean-script', function() {
    return gulp.src(appPath.js + '/*.js', {read: false, force: true})
        .pipe(clean());
});

gulp.task('clean-html', function() {
    return gulp.src(appPath.root + '/*.html', {read: false, force: true})
        .pipe(clean());
});

gulp.task('clean-css', function() {
    return gulp.src(appPath.css + '/*.css', {read: false, force: true})
        .pipe(clean());
});

gulp.task('views', ['clean-html'], function () {
    return gulp.src(sourcePath.pugSource)
        .pipe(pug({
            doctype: 'html',
            pretty: false
        }))
        .pipe(gulp.dest('./app/'));
});

gulp.task('script', function(){  
    return browserify({
        entries: ['./src/js/script.js']
    })
    .transform(babelify.configure({
        presets: ["es2015"]
    }))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(appPath.js))
    .pipe(connect.reload());
});

gulp.task('sass', function () {

    var cssStream = gulp.src(
        ['./node_modules/slick-carousel/slick/slick.css',
        './bower_components/normalize.css/normalize.css',
        './bower_components/bootstrap/dist/css/bootstrap.min.css',
        './bower_components/Ionicons/css/ionicons.min.css',])
        .pipe(concat('css-files.css'));

    var scssStream = gulp.src([sourcePath.sassSource])
        .pipe(sass())
        .pipe(concat('scss-files.scss'));


    var mergedStream = merge(cssStream, scssStream)
        .pipe(concat('style.css'))
        .pipe(minify())
        .pipe(gulp.dest(appPath.css));

    return mergedStream;

});

gulp.task('images', function () {
    return gulp.src(sourcePath.imgSource)
        .pipe(newer(appPath.img))
        .pipe(imagemin())
        .pipe(gulp.dest(appPath.img));
});

gulp.task('move', function () {
    return gulp.src(sourcePath.attachmentsSource)
        .pipe(gulp.dest(appPath.attachmentsSource));
});

gulp.task('setup', ['sass', 'images', 'views', 'script', 'move']);

gulp.task('watch', function () {
    gulp.watch(sourcePath.sassSource, ['sass']);
    gulp.watch(['src/views/**/*', sourcePath.pugSource], ['views']);
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