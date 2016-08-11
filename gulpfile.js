var gulp = require('gulp');
var browserSync = require('browser-sync');
var glob = require('glob');
var sass = require('gulp-sass');
var cssnext = require('gulp-cssnext');
var autoprefixer = require("gulp-autoprefixer");
var webPack = require('webpack');
var gulpWebPack = require('gulp-webpack');


gulp.task('sass', function(){
    gulp.src('src/sass/style.scss')
    .pipe(sass())
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe(autoprefixer())
    .pipe(cssnext())
    .pipe(gulp.dest('dest/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js',function(){
    gulp.src(['./src/js/app.js'])
    .pipe(gulpWebPack({
      output: {
        filename: './app.js',
      },
      // plugins: [
      //   new webPack.optimize.UglifyJsPlugin()
      // ]
    }))
    .pipe(gulp.dest('./dest/'))
    .pipe(browserSync.reload({stream:true}));
});
gulp.task('copy',function(){
    gulp.src(['./src/index.html'])
        .pipe(gulp.dest('./dest/'))
});

gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: "./dest/"
        },
        open: false
    });
    gulp.watch('./src/**/**', [ 'default', browserSync.reload]);
});

gulp.task("server", function() {
    browserSync({
        server: {
            baseDir: "./dest/"
        }
    });
});

gulp.task("default",['server'], function() {
    gulp.watch('./src/js/**/*.js',["js"]);
    gulp.watch('./src/sass/**/*.scss',["sass"]);
    gulp.watch('./src/index.html', ["copy", browserSync.reload]);
});
