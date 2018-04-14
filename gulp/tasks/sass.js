var fs = require('fs');
var gulp = require('gulp');
var prettyJSON = require('prettyjson');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var util = require('gulp-util');
var size = require('gulp-size');
var cssnano = require('cssnano');
var mqpacker = require('css-mqpacker');

var config = require('../config');

var plumberErrorHandler = function(error) {
    util.beep();
    util.log(error.toString());
    this.emit('end');
};

gulp.task('sass', function() {
    var processors = [
        autoprefixer({
            browsers: [
                'last 2 versions',
                'ie >= 9',
                'and_chr >= 2.3'
            ],
            cascade: true,
            add: true,
            remove: true
        }),
        mqpacker({
            sort: 'min-width'
        })
    ];

    if (config.production) {
        processors.push(cssnano({}));
    }

    return gulp.src('./scss/frontend/*.scss')
        .pipe(plumber(plumberErrorHandler))
        .pipe(config.production ? util.noop() : sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(postcss(processors))
        .pipe(config.production ? util.noop() : sourcemaps.write('.'))
        .pipe(config.production ? rename({suffix: '.min'}) : util.noop())
        .pipe(size())
        .pipe(gulp.dest('./app/webroot/css'));
});
