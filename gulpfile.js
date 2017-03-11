var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    usemin = require('gulp-usemin'),
    ngAnnotate = require('gulp-ng-annotate'),
    concat = require('gulp-concat'),
    rev = require('gulp-rev'),
    htmlmin = require('gulp-htmlmin'),
    templateCache = require('gulp-angular-templatecache'),
    ghPages = require('gulp-gh-pages'),
    cssmin = require('gulp-cssmin');
var plug = require('gulp-load-plugins')();
var paths = require('./gulp.config.json');


/**
 * Remove all files from the build folder
 * @return {Stream}
 */
gulp.task('clean', function (cb) {
    del(paths.build, cb);
});


/**
 * Runs bower to install frontend dependencies
 * @return {Stream}
 */
gulp.task('bower', function () {
    var install = require("gulp-install");
    return gulp.src(['./bower.json'])
        .pipe(install());
});


// build from index file
gulp.task('build-index', function () {
    return gulp.src(paths.index)
        .pipe(usemin())
        .pipe(gulp.dest('./dist/'));
});


// copy favicon
gulp.task('favicon', function () {
    return gulp.src(paths.favicon)
        .pipe(gulp.dest('./dist/'));
});


// copy semantic-ui assets
gulp.task('build-assets', function () {
    return gulp.src(paths.assets)
        .pipe(gulp.dest('./dist/css/themes/default/assets/'));
});


/**
 * Create $templateCache from the html templates
 * @return {Stream}
 */
gulp.task('templatecache', function() {
    return gulp
        .src(paths.html)
        .pipe(plug.minifyHtml({
            empty: true
        }))
        .pipe(plug.angularTemplatecache('templates.js', {
            module: 'app.core',
            standalone: false,
            root: 'app/'
        }))
        .pipe(gulp.dest(paths.build + 'js/'));
});


/**
 * Runs jshint
 * @return {Stream}
 */
gulp.task('jshint', function () {
    var jshintrcFile = './.jshintrc';
    var source = [].concat(paths.js);
    gulp.src(source)
        .pipe(jshint(jshintrcFile))
        .pipe(jshint.reporter('jshint-stylish'));
});


/**
 * Minify and bundle the app's JavaScript
 * @return {Stream}
 */
gulp.task('build-js', ['jshint', 'templatecache'], function () {
    var source = [].concat(paths.js, paths.build + 'js/' + 'templates.js');
    gulp.src(source)
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build + 'js/'));
});


/**
 * Copy the Vendor JavaScript
 * @return {Stream}
 */
gulp.task('vendor-js', function() {
    return gulp.src(paths.vendorjs)
        .pipe(plug.concat('vendor.min.js'))
        .pipe(plug.uglify())
        .pipe(gulp.dest(paths.build  + 'js/'));
});


/**
 * Minify and bundle the Vendor CSS
 * @return {Stream}
 */
gulp.task('vendor-css', function() {
    return gulp.src(paths.vendorcss)
        .pipe(plug.concat('vendor.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(paths.build + 'css/'));
});


// full build
gulp.task('build', [
        'clean',
        'build-js',
        'bower',
        'build-index',
        'vendor-js',
        'vendor-css',
        'build-assets',
        'favicon'
    ],
    function () {
    }
);


// watches file system and triggers a build when a modification is detected
gulp.task('watch', function () {
    return gulp.watch([
            './src/app/index.html',
            './src/app/**/*.css',
            './src/app/**/*.html',
            './src/app/**/*.js',
            './src/app/*.js'],
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


// launch a build upon modification and publish it to a running server
gulp.task('dev', ['build', 'watch', 'server']);


// installs and builds everything
gulp.task('default', ['build']);
