var gulp = require('gulp');
var fs = require('fs');
var browserify = require('gulp-browserify');
var babelify = require('babelify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var paths = {
  app: './src/js/app.js',
  src: 'src/js/**/*.*',
  buildJs: 'build/js/',
  buildCss: 'build/css/',
  buildHtml: 'build/',
  html: 'src/index.html',
  scss: 'src/scss/**/*.scss',
  scssMain: 'src/scss/main.scss'
};

gulp.task('watch', ['browserify'], function () {
  gulp.watch(paths.src, ['browserify']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.scss, ['scss']);
});

/**
 * Copy index.html file into build folder and reload browserSync
 */
gulp.task('html', function () {
  gulp.src(paths.html)
      .pipe(gulp.dest(paths.buildHtml))
      .pipe(reload);
});

/**
 * Compile main Scss file into build folder and stream update browserSync
 */
gulp.task('scss', function () {
  gulp.src(paths.scssMain)
      .pipe(sass())
      .pipe(gulp.dest(paths.css))
      .pipe(reload({stream: true}));
})

gulp.task('browserify', function() {
  gulp.src(paths.app)
      .pipe(browserify({
        debug: true,
        transform: ['babelify']
      }))
      .pipe(rename('app.js'))
      .pipe(gulp.dest(paths.buildJs));
});

gulp.task('browserSync', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: paths.build
    }
  });
});

gulp.task('default', ['browserSync']);