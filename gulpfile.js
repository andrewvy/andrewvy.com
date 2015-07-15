var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var mainBowerFiles = require('main-bower-files');

var paths = {
	vendor: ['assets/javascripts/vendor/*.js'],
	bower: ['assets/javascripts/vendor/bower_components'],
	scripts: ['assets/javascripts/app'],
	stylesheets: ['assets/stylesheets/**/*.scss']
};

gulp.task('compile-scss', function() {
	gulp.src(paths.stylesheets)
		.pipe(sass({ indentedSyntax: false, errLogToConsole: true }))
		.pipe(gulp.dest('static/stylesheets'));
});

gulp.task('vendor', function() {
	gulp.src(paths.vendor)
		.pipe(concat('vendor.js'))
		.pipe(uglify())
		.pipe(gulp.dest('static/javascripts/vendor.js'))
		.on('error', gutil.log);
});

gulp.task('bower', function() {
	gulp.src(mainBowerFiles())
		.pipe(concat('bower.js'))
		.pipe(uglify())
		.pipe(gulp.dest('static/javascripts/bower.js'))
		.on('error', gutil.log);
});

gulp.task('watch', function() {
	gulp.watch(paths.vendor, ['vendor']);
	gulp.watch(mainBowerFiles(), ['bower']);
	gulp.watch(paths.stylesheets, ['compile-scss']);
});

gulp.task('default', ['compile-scss', 'vendor', 'bower', 'watch']);
