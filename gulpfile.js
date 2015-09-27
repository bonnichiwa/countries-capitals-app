var gulp = require('gulp');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ngmin');
var browserify = require('browserify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var usemin = require('gulp-usemin');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var paths = {
  scripts: ['app/**/*.js', '!bower_components/**/*.js'],
  index: 'app/**/*.html',
  build: 'build/'
}

// gulp.task('usemin', function() {
//   gulp.src(paths.index)
//   .pipe(usemin({
//     css: [minifyCss(), 'concat'],
//     js: [ngmin(), uglify()]
//   }))
//   .pipe(gulp.dest(paths.build))
// })

gulp.task('connect', function() {
  connect.server();
});

// Minify index
gulp.task('html', function() {
  gulp.src('app/index.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest('build/'));
});

// Minify CSS 
gulp.task('minify-css', function() {
  return gulp.src ('app/styles.css')
  .pipe(minifyCss({compatibility: 'ie8'}))
  .pipe(gulp.dest('build/css'));
});

// JS Build
gulp.task('scripts', function() {
  return browserify('app/app.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('default', ['connect']);

gulp.task('build', ['html', 'minify-css', 'scripts']);
