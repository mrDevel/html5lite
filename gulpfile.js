'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass');


gulp.task('sass', function () {
   return gulp.src('app/sass/**/*.sass')
       .pipe(sass())
       .pipe(gulp.dest('app/css'))
});