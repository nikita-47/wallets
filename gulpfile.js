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

// cleans the build output
gulp.task('clean', function (cb) {
    del([
        './dist/*'
    ], cb);
});


// runs bower to install frontend dependencies
gulp.task('bower', function () {
    var install = require("gulp-install");
    return gulp.src(['./bower.json'])
        .pipe(install());
});



// build from index file
gulp.task('build-index', function () {
    return gulp.src('./app/index.html')
        .pipe(usemin({
            css: [cssmin(), rev()],
            html: [htmlmin({collapseWhitespace: true})],
            js: [uglify(), rev()]
        }))
        .pipe(gulp.dest('./dist/'));
});


// copy favicon
gulp.task('favicon', function () {
    return gulp.src('./app/favicon.ico')
        .pipe(gulp.dest('./dist/'));
});


// copy semantic-ui assets
gulp.task('build-assets', function () {
    return gulp.src(['./app/bower_components/semantic/dist/themes/default/assets/**/*'])
        .pipe(gulp.dest('./dist/css/themes/default/assets'));
});


/**
 * Create $templateCache from the html templates
 * @return {Stream}
 */
gulp.task('templatecache', function() {
    return gulp
        .src(paths.htmltemplates)
        .pipe(plug.minifyHtml({
            empty: true
        }))
        .pipe(plug.angularTemplatecache('templates.js', {
            module: 'app.core',
            standalone: false,
            root: 'app/'
        }))
        .pipe(gulp.dest(paths.build + '/js/'));
});

// runs jshint
gulp.task('jshint', function () {
    var jshintrcFile = './.jshintrc';
    var source = [].concat(paths.js);
    gulp.src(source)
        .pipe(jshint(jshintrcFile))
        .pipe(jshint.reporter('jshint-stylish'));
});


// build application
gulp.task('build-js', function () {
    var source = [].concat(paths.js);
    gulp.src(source)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js/'));
});


// full build
gulp.task('build', [
        'clean',
        'build-js',
        'bower',
        'jshint',
        'templatecache',
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


// launch a build upon modification and publish it to a running server
gulp.task('dev', ['build', 'watch', 'server']);


// installs and builds everything
gulp.task('default', ['build']);
