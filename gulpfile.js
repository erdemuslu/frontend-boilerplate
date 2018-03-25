var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload(),
    autoprefixer = require('gulp-autoprefixer'),
    clean = require('gulp-clean');

var sourcePath = {
    sassSource: 'src/scss/*.scss',
    htmlSource: 'src/*.html'
}

var appPath = {
    root: 'app/',
    css: 'app/css',
    js: 'app/js'
}

gulp.task('clean-html', function() {
    return gulp.src(appPath.root + '/*.html', {read: false, force: true})
        .pipe(clean());
})

gulp.task('sass', function() {
    return gulp.src(sourcePath.sassSource)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
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

gulp.task('watch', ['serve', 'sass', 'copy', 'clean-html'], function() {
    gulp.watch([sourcePath.sassSource], ['sass']);
    gulp.watch([sourcePath.htmlSource], ['copy']);
});

gulp.task('default', ['watch']);