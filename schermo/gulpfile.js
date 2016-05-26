/* 


$ npm install gulp-useref --save-dev
$ npm install gulp-uglify --save-dev 
$ npm install gulp-cssnano
$ npm install gulp-imagemin --save-dev

*/
var gulp = require ('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

//OTTIMIZZAZIONE - on c-prompt gulp optimize
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
//var imagemin = require('gulp-imagemin');

var runSequence = require('run-sequence');


//var autoprefixer = require('gulp-autoprefixer');
//var minifycss = require('gulp-minify-css');
//var rename = require('gulp-rename');


/* 'sass' è il nome del task che va richiamato quando si compila con gulp sass */
gulp.task('sass', function() {
   return gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});


//per ativare automaticamente il task sass quando salvo i file scss
gulp.task('watch', function(){
  gulp.watch('./scss/**/*.scss', ['sass']); 
  // Other watchers
})


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
})


gulp.task('development', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
})

gulp.task('optimize', function (callback) {
  runSequence(['sass', 'useref'],
    callback
  )
})