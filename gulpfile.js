var gulp = require('gulp'),
    sass = require('gulp-sass'),
    bs = require('browser-sync');

gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(bs.reload({stream: true}))
});

gulp.task('browser-sync', function () {
    bs({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('watch', ['browser-sync', 'sass'], function () {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/*.html', bs.reload);
});