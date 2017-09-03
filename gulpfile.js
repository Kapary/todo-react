'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')({ lazy: true });

gulp.task('build-styles', function() {
  return gulp.src('./src/less/app.less')
    .pipe($.less())
    .pipe($.plumber())

    // ff >= 25 for SlimerJS which is compatible with FF 25
    .pipe($.autoprefixer('last 2 version', 'ie >= 10', 'ff >= 25', 'Safari >= 8'))
    .pipe($.minifyCss())
    .pipe(gulp.dest('./src/css/'));
});
