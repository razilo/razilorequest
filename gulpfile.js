var gulp = require('gulp');
var rename = require("gulp-rename");
var browserify = require('gulp-browserify');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var util = require('gulp-util');

/**************************************************/
/* Build into distributable, development versions */
/**************************************************/

gulp.task('build', ['build-es6-js']);

gulp.task('build-es6-js', function() {
	gulp.src('./build/index.es6.js')
		.pipe(browserify({transform: ['babelify']}))
		.on('error', function(err) { console.log(err); util.beep(); this.emit('end'); })
		.pipe(rename('index.js'))
		.pipe(gulp.dest('./build/'))
		.pipe(rename('index.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./build/'));
});
