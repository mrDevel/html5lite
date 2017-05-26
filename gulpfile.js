'use strict';


const gulp = require('gulp');
const sass = require('gulp-sass');
const bs = require('browser-sync');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');
const del = require('del');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');


var libsJs = [
    'app/libs/jquery/dist/jquery.js'
];


gulp.task('sass', function () {
    return gulp.src('app/sass/style.sass')
        .pipe(sass({outputStyle: 'compressed'}))
        .on('error', notify.onError())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(bs.reload({stream: true}))
});

gulp.task('scripts', function () {
    return gulp.src(libsJs)
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('clean', function () {
    return del('dist');
});

gulp.task('server', function () {
    bs({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('build', ['clean','sass','scripts','img'], function () {
    gulp.src('app/css/**/*.css').pipe(gulp.dest('dist/css'));
    gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));
    gulp.src('app/js/**/*.js').pipe(gulp.dest('dist/js'));
    gulp.src('app/*.html').pipe(gulp.dest('dist'));
});

gulp.task('watch', ['server','sass','scripts'], function(){
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch(['app/*.html','app/js/*.js'], bs.reload);
});

gulp.task('default',['watch']);

