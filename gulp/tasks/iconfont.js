var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');

var fontName = 'passwdgen';

gulp.task('iconfont', function() {
  gulp.src(['./assets/icons/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      targetPath: '../../../scss/frontend/base/fonts/_' + fontName + '.scss',
      fontPath: '../fonts/'
    }))
    .pipe(iconfont({
      fontName: fontName,
      //prependUnicode: true,
      // Usun woff2 jak bedziesz miec errory
      formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
      normalize: true,
      fontHeight: 1001
    }))
    .pipe(gulp.dest('./app/webroot/fonts/'))
});
