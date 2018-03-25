var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload(),
    autoprefixer = require('gulp-autoprefixer'),
    browserify = require('gulp-browserify'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    merge = require('merge-stream');

var sourcePath = {
    sassSource: 'src/scss/*.scss',
    htmlSource: 'src/*.html',
    jsSource: 'src/js/**'
}

var appPath = {
    root: 'app/',
    css: 'app/css',
    js: 'app/js'
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

gulp.task('copy', ['clean-html'], function() {
    return gulp.src(sourcePath.htmlSource)
        .pipe(gulp.dest(appPath.root))
});

gulp.task('serve', ['sass'], function() {
    browserSync.init([appPath.css + '/*.css', appPath.root + '/*.html', appPath.js + '/*.js'], {
        server:{
            baseDir: appPath.root
        }
    })
});

gulp.task('watch', ['serve', 'sass', 'copy', 'clean-html', 'script', 'clean-script'], function() {
    gulp.watch([sourcePath.sassSource], ['sass']);
    gulp.watch([sourcePath.htmlSource], ['copy']);
    gulp.watch([sourcePath.jsSource], ['script']);
});

gulp.task('default', ['watch']);