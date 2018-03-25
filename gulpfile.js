var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload();

var sourcePath = {
    sassSource: 'src/scss/*.scss'
}

var appPath = {
    root: 'app/',
    css: 'app/css',
    js: 'app/js'
}

gulp.task('sass', function() {
    return gulp.src(sourcePath.sassSource)
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest(appPath.css));
});

gulp.task('serve', ['sass'], function() {
    browserSync.init([appPath.css + '/*.css', appPath.root + '/*.html', appPath.js + '/*.js'], {
        server:{
            baseDir: appPath.root
        }
    })
});

gulp.task('watch', ['serve', 'sass'], function() {
    gulp.watch([sourcePath.sassSource], ['sass'])
});

gulp.task('default', ['watch']);