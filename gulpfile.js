var gulp = require('gulp'),
    connect = require('gulp-connect');
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
    ghPages = require('gulp-gh-pages'),
    cssmin = require('gulp-cssmin'),
    plug = require('gulp-load-plugins')(),
    paths = require('./gulp.config.json');


/**
 * Remove all files from the build folder
 * @return {Stream}
 */
gulp.task('clean', function () {
    return del.sync(paths.build);
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


/**
 * Build index file
 * @return {Stream}
 */
gulp.task('build-index', function () {
    return gulp.src(paths.index)
        .pipe(usemin())
        .pipe(usemin({
            html: [htmlmin({collapseWhitespace: true})]
        }))
        .pipe(gulp.dest(paths.build));
});


/**
 * Copy favicon
 * @return {Stream}
 */
gulp.task('favicon', function () {
    return gulp.src(paths.favicon)
        .pipe(gulp.dest(paths.build));
});

/**
 * Copy semantic-ui assets
 * @return {Stream}
 */
gulp.task('build-assets', function () {
    return gulp.src(paths.assets)
        .pipe(gulp.dest(paths.assetsdist));
});


/**
 * Create $templateCache from the html templates
 * @return {Stream}
 */
gulp.task('templatecache', function () {
    return gulp
        .src(paths.html)
        .pipe(plug.minifyHtml({
            empty: true
        }))
        .pipe(plug.angularTemplatecache('templates.js', {
            module: 'app.core',
            standalone: false,
            root: 'src/app/'
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
    return gulp.src(source)
        .pipe(jshint(jshintrcFile))
        .pipe(jshint.reporter('jshint-stylish'));
});


/**
 * Minify and bundle the app's JavaScript
 * @return {Stream}
 */
gulp.task('build-js', ['jshint', 'templatecache'], function () {
    var source = [].concat(paths.js, paths.build + 'js/' + 'templates.js');
    return gulp.src(source)
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
gulp.task('vendor-js', function () {
    return gulp.src(paths.vendorjs)
        .pipe(plug.concat('vendor.min.js'))
        .pipe(plug.uglify())
        .pipe(gulp.dest(paths.build + 'js/'));
});


/**
 * Minify and bundle the Vendor CSS
 * @return {Stream}
 */
gulp.task('vendor-css', function () {
    return gulp.src(paths.vendorcss)
        .pipe(plug.concat('vendor.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(paths.build + 'css/'));
});


/**
 * Full build
 * @return {Stream}
 */
gulp.task('build', [
        'clean',
        'bower',
        'build-js',
        'build-index',
        'vendor-js',
        'vendor-css',
        'favicon',
        'build-assets'
    ]
);


/**
 * Watches file system and triggers a build when a modification is detected
 * @return {Stream}
 */
gulp.task('watch', function () {
    return gulp.watch(paths.watch, ['build']);
});


/**
 * Start local server
 * @return {Stream}
 */
gulp.task('server', function () {
    return connect.server({
        root: paths.build,
        port: 8888,
        fallback: 'index.html'
    });
});


/**
 * Deploy on gh-pages
 * @return {Stream}
 */
gulp.task('deploy', function () {
    return gulp.src(paths.build + '**/*')
        .pipe(ghPages());
});


/**
 * launch a build upon modification and publish it to a running server
 * @return {Stream}
 */
gulp.task('dev', ['build', 'watch', 'server']);


/**
 * Just build
 * @return {Stream}
 */
gulp.task('default', ['build']);
