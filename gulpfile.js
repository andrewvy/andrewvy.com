var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');

var mainBowerFiles = require('main-bower-files');

var paths = {
	vendor: ['assets/javascripts/vendor/*.js'],
	bower: ['assets/javascripts/vendor/bower_components'],
	scripts: ['assets/javascripts/app/*.js'],
	stylesheets: ['assets/stylesheets/**/*.scss']
};

var onError = function (err) {
	gutil.beep();
	console.log(err);
}

gulp.task('compile-scss', function() {
	gulp.src(paths.stylesheets)
		.pipe(sass({ indentedSyntax: false, errLogToConsole: true }))
		.pipe(gulp.dest('static/stylesheets'))
		.pipe(plumber({
			errorHandler: onError
		}));
});

gulp.task('javascripts', function() {
	gulp.src(paths.scripts)
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(gulp.dest('static/javascripts/'));
});

gulp.task('vendor', function() {
	gulp.src(paths.vendor)
		.pipe(concat('vendor.js'))
		.pipe(uglify())
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(gulp.dest('static/javascripts/'));
});

gulp.task('bower', function() {
	gulp.src(mainBowerFiles())
		.pipe(concat('bower.js'))
		.pipe(uglify())
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(gulp.dest('static/javascripts/'));
});

gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['javascripts']);
	gulp.watch(paths.vendor, ['vendor']);
	gulp.watch(mainBowerFiles(), ['bower']);
	gulp.watch(paths.stylesheets, ['compile-scss']);
});

gulp.task('default', ['compile-scss', 'javascripts', 'vendor', 'bower', 'watch']);
