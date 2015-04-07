var gulp = require('gulp'),
  connect = require('gulp-connect');
 
gulp.task('webserver', function() {
 connect.server({
    livereload: true
  });

});

gulp.task('reload', function() {
  gulp.src('*.*')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['js/*.js','*.html'], ['reload']);
})
 
gulp.task('default', ['webserver','watch']);
