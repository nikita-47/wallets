const gulp = require('gulp'),
  webserver = require('gulp-webserver'),
  del = require('del'),
  sourcemaps = require('gulp-sourcemaps'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint');
const karma = require('gulp-karma');
const stylish = require('jshint-stylish');
const usemin = require('gulp-usemin');
const babel = require('gulp-babel');
const ngAnnotate = require('gulp-ng-annotate');
const concat = require('gulp-concat');
const rev = require('gulp-rev');
const htmlmin = require('gulp-htmlmin');
const templateCache = require('gulp-angular-templatecache');
const ghPages = require('gulp-gh-pages');
const cssmin = require('gulp-cssmin');


// cleans the build output
gulp.task('clean', function (cb) {
  del([
    './dist/*'
  ], cb);
});


// runs bower to install frontend dependencies
gulp.task('bower', function () {
  const install = require("gulp-install");
  return gulp.src(['./bower.json'])
    .pipe(install());
});


// build templates
gulp.task('build-template', function () {
  return gulp.src(['./app/**/*.html', '!./app/bower_components/**'])
    .pipe(templateCache('templates.js', {standalone: true}))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});


// build from index file
gulp.task('build-index', function () {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      css: [cssmin(), rev()],
      html: [htmlmin({collapseWhitespace: true})],
      js: [uglify(), rev()],
      app: [
        sourcemaps.init(),
        babel({
          presets: ['es2015']
        }),
        ngAnnotate(),
        uglify(),
        rev(),
        sourcemaps.write()
      ]
    }))
    .pipe(gulp.dest('./dist/'));
});


gulp.task('favicon', function () {
  return gulp.src('./app/favicon.ico')
    .pipe(gulp.dest('./dist/'));
});


// copy semantic-ui assets
gulp.task('build-assets', function () {
  return gulp.src('./app/bower_components/semantic/dist/themes/default/assets/**/*.*')
    .pipe(gulp.dest('./dist/css/themes/default/assets/'));
});


// full build
gulp.task('build', [
    'clean',
    'bower',
    'jshint',
    'build-template',
    'build-index',
    'build-assets',
    'favicon'
  ],
  function () {
  }
);


// watches file system and triggers a build when a modification is detected
gulp.task('watch', function () {
  return gulp.watch([
      './app/index.html',
      './app/**/**/*.html',
      './app/**/*.css',
      './app/**/**/*.js',
      './app/**/*.html',
      './app/**/*.js',
      './app/*.js'],
    ['build']);
});


// launches a web server that serves files in the current directory
gulp.task('server', function () {
  gulp.src('dist')
    .pipe(webserver({
      livereload: false,
      directoryListing: true,
      open: "http://localhost:8000/index.html#/users"
    }));
});


// Deploy to gh-pages
gulp.task('deploy', function () {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});


// runs jshint
gulp.task('jshint', function () {
  gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
    .pipe(jshint({esversion: 6}))
    .pipe(jshint.reporter('jshint-stylish'));
});


// launch a build upon modification and publish it to a running server
gulp.task('dev', ['build', 'watch', 'server']);


// installs and builds everything
gulp.task('default', ['build']);
