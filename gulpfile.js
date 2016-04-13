var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    mocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul'),
    coveralls = require('gulp-coveralls'),
    plumber = require('gulp-plumber');

//Scripts Task
//Uglify
gulp.task('scripts', function () {
    gulp.src(['data-structures/**/*.js', '!data-structures/**/*tests.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

//Tests task
gulp.task('tests', function (cb) {
    var mochaErr;

    gulp.src('test/**/*.js')
        .pipe(plumber())
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', function (err) {
            mochaErr = err;
        })
        .pipe(istanbul.writeReports())
        .on('end', function () {
            cb(mochaErr);
        });
});

//Watch task
gulp.task('watch', function () {
    gulp.watch('data-structures/**/*.js', ['tests', 'scripts']);
});

gulp.task('default', ['tests', 'scripts', 'watch']);