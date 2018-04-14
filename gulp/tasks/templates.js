var gulp = require('gulp');
var fileInclude = require('gulp-file-include');

gulp.task('templates', function() {
    return gulp.src('./tpl/*.html')
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./app/webroot'));
});