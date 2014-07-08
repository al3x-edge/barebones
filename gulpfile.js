// Load plugins
var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')({ camelize: true });

// Styles
gulp.task('styles', function() {
  return gulp.src('assets/scss/*.scss')
	.pipe(plugins.rubySass({ style: 'expanded' }))
	.pipe(plugins.autoprefixer('last 2 versions', 'ie 9', 'ios 6', 'android 4'))
	.pipe(plugins.minifyCss({ keepSpecialComments: 1 }))
	.pipe(gulp.dest('build/assets'))
	.pipe(plugins.notify({ message: 'Styles task complete' }));
});

// Site Scripts
gulp.task('scripts', function() {
  return gulp.src(['assets/coffee/*.coffee', 'assets/coffee/*.js'])
	// .pipe(plugins.jshint('.jshintrc'))
	// .pipe(plugins.jshint.reporter('default'))
	.pipe(plugins.concat('main.js'))
	.pipe(plugins.rename({ suffix: '.min' }))
	.pipe(plugins.uglify())
	.pipe(gulp.dest('build/assets'))
	.pipe(plugins.notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('assets/images/**/*')
	.pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 7, progressive: true, interlaced: true })))
	.pipe(gulp.dest('build/assets/images'))
	.pipe(plugins.notify({ message: 'Images task complete' }));
});

// Watch
gulp.task('watch', function() {

	// Watch .scss files
	gulp.watch('assets/scss/**/*.scss', ['styles']);

	// Watch .js files
	gulp.watch(['assets/coffee/**/*.coffee', 'assets/coffee/**/*.js'], ['scripts']);

	// Watch image files
	gulp.watch('assets/images/**/*', ['images']);

});


// Default task
gulp.task('default', ['styles', 'plugins', 'scripts', 'images']);
