'use strict';

const gulp = require('gulp'),
      babelify = require('babelify'),
      browserify = require('browserify'),
      buffer = require('vinyl-buffer'),
      connect = require('gulp-connect'),
      del = require('del'),
      gulpif = require('gulp-if'),
      jshint = require('gulp-jshint'),
      source = require('vinyl-source-stream'),
      uglify = require('gulp-uglify'),
      watchify = require('watchify');

const browserifyConfig = {
  debug: true,
  entries: './src/main.js',
  packageCache: {},
};

const browserifyLibConfig = {
  debug: false,
  packageCache: {},
};

const libs = [
  'lodash',
  'randomcolor'
];

let watch, production;

gulp.task('build', ['clean'], () => {
  production = true;
  gulp.start('start');
});

gulp.task('buildDev', ['clean'], () => {
  gulp.start('start');
});

gulp.task('watch', ['clean'], () => {
  watch = true;
  gulp.start('start');
  gulp.start('connect');
  gulp.watch('src/**/*', ['reload']);
});

gulp.task('start', ['JS', 'vendorJS', 'CSS', 'index']);

gulp.task('clean', () => {
  return del([
    'build/**/*',
  ]);
});

gulp.task('connect', () => {
  connect.server({
    root: 'build/',
    livereload: true
  });
});

gulp.task('CSS', () => gulp.src('./src/style.css').pipe(gulp.dest('build/')));

gulp.task('index', () => gulp.src('./src/index.html').pipe(gulp.dest('build/')));

gulp.task('JS', () => {
  let b = browserify(browserifyConfig)
  .transform(babelify, {
    presets: ['es2015']
  })
  .external(libs);
  if(watch) b.plugin(watchify);
  bundle(b, 'bundle.js');
  if(watch) b.on('update', bundle.bind(null, b, 'bundle.js'));
});

gulp.task('lint', ()  => gulp.src(['src/**/*.js'])
  .pipe(jshint({
    elision: true,
    esnext: true
  }))
  .pipe(jshint.reporter ('default')));

gulp.task('reload', ['index', 'CSS'], () => gulp.src('src/**/*')
  .pipe(connect.reload()));

gulp.task('vendorJS', () => {
  let b = browserify(browserifyLibConfig)
    .transform(babelify, {
      presets: ['es2015']
    })
    .require(libs);
  bundle(b, 'vendor.js');
});

function bundle(b, name) {
  gulp.start('lint');
  b.bundle().on('error', handleError)
  .pipe(source(name))
  .pipe(buffer())
  .pipe(gulpif(production, uglify()))
  .pipe(gulp.dest('build'));
  console.log(`Bundling of ${name} finished!`);
  return b;
}

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}
