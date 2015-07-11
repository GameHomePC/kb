var gulp = require('gulp');
var sass = require('gulp-sass');
var rubySass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var googleWebFonts = require('gulp-google-webfonts');
var browserSync = require('browser-sync').create();

var globalServer = 'https://dev.shopplanetblue.com';
var localServer = 'kb.loc';
var sassPath = 'sass/**/*.scss';
var templatesPath = '**/*.html';


gulp.task('google-fonts', function () {
    gulp.src('./fonts.list')
        .pipe(googleWebFonts())
        .pipe(gulp.dest('./fonts'))
});

//gulp.task('rubySass', function() {
//    return rubySass(sassPath, { sourcemap: true, compass: true })
//        .on('error', function (err) {
//            console.error('Error!', err.message);
//        })
//        .pipe(sourcemaps.write())
//        .pipe(gulp.dest('./css/*.css'));
//});
//
//gulp.task('dev-rubySass', function () {
//    return rubySass(sassPath, { sourcemap: true, compass: true })
//        .on('error', function (err) {
//            console.error('Error!', err.message);
//        })
//        .pipe(sourcemaps.write())
//        .pipe(gulp.dest('./css/*.css'))
//        .pipe(browserSync.reload({stream: true}));
//});

gulp.task('sass', function () {
    gulp.src(sassPath)
        .pipe(sass())
        .pipe(autoprefixer('last 3 version', '> 1%', 'ie 8', 'ie 7'))
        .pipe(gulp.dest('./css'));
});

gulp.task('dev-sass', function () {
    gulp.src(sassPath)
        .pipe(sourcemaps.init())
        .pipe(sass())
        //.pipe(autoprefixer('last 3 version', '> 1%', 'ie 8', 'ie 7'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('browser-sync', function() {
    browserSync.init({
        port: 81,
        server: {
            baseDir: "./"
        }
    });


});

gulp.task('watch', function() {
    gulp.watch(templatesPath).on('change', browserSync.reload);
    gulp.watch(sassPath, ['dev-sass']);
});

gulp.task('build', ['google-fonts', 'sass']);

gulp.task('default', ['google-fonts', 'browser-sync', 'dev-sass', 'watch']);
