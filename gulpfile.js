var gulp = require('gulp'),
	sass = require('gulp-sass');

gulp.task('sass', function() {
    gulp.src('src/stylesheets/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'))
});

//Watch task
gulp.task('default',function() {
    gulp.watch('src/stylesheets/**/*.sass',['sass']);
});