var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    connect = require('gulp-connect');

gulp.task('default', ['watch']);

gulp.task('connect', function() {
  connect.server({
    root: 'app/',
    livereload: true
  });
});

gulp.task('lint', function() {
  return gulp.src(['app/**/*.js'])
             .pipe(jshint())
             .pipe(jshint.reporter ('default'));
});

gulp.task('reload', ['lint'], function() {
  gulp.src('').pipe(connect.reload());
});

gulp.task('watch', ['connect', 'lint'], function() {
  gulp.watch(['app/**/*'], ['reload']);
});
