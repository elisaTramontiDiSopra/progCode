var gulp = require ('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
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