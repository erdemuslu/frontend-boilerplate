var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload(),
    autoprefixer = require('gulp-autoprefixer'),
    browserify = require('gulp-browserify'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    merge = require('merge-stream'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    injectPartials = require('gulp-inject-partials');

var sourcePath = {
    sassSource: 'src/scss/*.scss',
    htmlSource: 'src/*.html',
    htmlPartialsSource: 'src/partial/*.html',
    jsSource: 'src/js/**',
    imgSource: 'src/img/**'
}

var appPath = {
    root: 'app/',
    css: 'app/css',
    js: 'app/js',
    img: 'app/img'
}

gulp.task('clean-html', function() {
    return gulp.src(appPath.root + '/*.html', {read: false, force: true})
        .pipe(clean());
});

gulp.task('clean-script', function() {
    return gulp.src(appPath.js + '/*.js', {read: false, force: true})
        .pipe(clean());
});

gulp.task('script', ['clean-script'], function() {
    return gulp.src(sourcePath.jsSource)
        .pipe(concat('main.js'))
        .pipe(browserify())        
        .pipe(gulp.dest(appPath.js))
});

gulp.task('script-watch', ['script'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('html', function() {
    return gulp.src(sourcePath.htmlSource)
        .pipe(injectPartials())
        .pipe(gulp.dest(appPath.root))
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

gulp.task('images', function() {
    return gulp.src(sourcePath.imgSource)
        .pipe(newer(appPath.img))
        .pipe(imagemin())
        .pipe(gulp.dest(appPath.img));
});

gulp.task('serve', function() {
    browserSync.init([appPath.css + '/*.css', appPath.root + '/*.html', appPath.js + '/*.js'], {
        server:{
            baseDir: appPath.root
        }
    })
});

gulp.task('watch', ['serve', 'sass', 'clean-html', 'script', 'script-watch', 'clean-script', 'images', 'html'], function() {
    gulp.watch([sourcePath.sassSource], ['sass']);
    gulp.watch([sourcePath.jsSource], ['script']);
    gulp.watch(sourcePath.jsSource, ['script-watch']);
    gulp.watch([sourcePath.imgSource], ['images']);
    gulp.watch([sourcePath.htmlSource, sourcePath.htmlPartialsSource], ['html']);
});

gulp.task('default', ['watch']);