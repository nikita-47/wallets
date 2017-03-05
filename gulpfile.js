var gulp = require('gulp'),
  webserver = require('gulp-webserver'),
  del = require('del'),
  sourcemaps = require('gulp-sourcemaps'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var angularTemplates = require('gulp-angular-templates');
var babel = require('gulp-babel');
var ngAnnotate = require('gulp-ng-annotate');
var concat = require('gulp-concat');
var rev = require('gulp-rev');
var htmlmin = require('gulp-htmlmin');
var cleanCss = require('gulp-clean-css');
var htmlusemin = require('gulp-usemin-html');
var CacheBuster = require('gulp-cachebust');
var templateCache = require('gulp-angular-templatecache');
var cachebust = new CacheBuster();


// cleans the build output
gulp.task('clean', function (cb) {
  del([
    './dist'
  ], cb);
});


// runs bower to install frontend dependencies
gulp.task('bower', function() {
  var install = require("gulp-install");
  return gulp.src(['./bower.json'])
    .pipe(install());
});


// fills in the Angular template cache, to prevent loading the html templates via
// separate http requests
gulp.task('build-template-cache', function() {
  return gulp.src(['./app/**/*.html', '!./app/bower_components/**'])
    .pipe(templateCache('templates.module.js', { standalone: true }))
    .pipe(gulp.dest('./dist/'));
});


gulp.task('build-index', function () {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      css: [],
      html: [htmlmin({collapseWhitespace: true})],
      js: [uglify(), rev()],
      app: [
        sourcemaps.init(),
        babel({
          presets: ['es2015']
        }),
        ngAnnotate(),
        uglify(),
        sourcemaps.write(),
        rev()
      ]
    }))
    .pipe(gulp.dest('./dist/'));
});


// full build (except sprites), applies cache busting to the main page css and js bundles
gulp.task('build', [ 'clean', 'build-template-cache', 'build-index'], function() {
});

// watches file system and triggers a build when a modification is detected
gulp.task('watch', function() {
  return gulp.watch(['./app/index.html','./app/**/*.html', './app/**/*.js', './app/*.js'], ['build']);
});


// launches a web server that serves files in the current directory
gulp.task('server', ['watch','build'], function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: false,
      directoryListing: true,
      open: "http://localhost:8000/dist/index.html"
    }));
});


// launch a build upon modification and publish it to a running server
gulp.task('dev', ['watch', 'webserver']);


// installs and builds everything
gulp.task('default', ['build']);
