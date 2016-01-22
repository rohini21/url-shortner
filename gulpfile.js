var gulp        = require('gulp');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var plugins     = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var watchLess   = require('gulp-watch-less');
var less        = require('gulp-less');

 
gulp.task('less', function () {
  return gulp.src('less/style.less')
    .pipe(watchLess('less/style.less'))
    .pipe(less())
    .pipe(gulp.dest('css'));
});

// Build LESS to CSS
/*gulp.task('build-css', function() {
  return gulp.src('./website/less/*.less')
    .pipe(plugins.plumber())
    .pipe(plugins.less())
    .on('error', function (err) {
        gutil.log(err);
        this.emit('end');
    })
    .pipe(plugins.autoprefixer(
        {
          browsers: [
            '> 5%',
            'last 2 versions',
            'firefox >= 4',
            'safari 7',
            'safari 8',
            'IE 8',
            'IE 9',
            'IE 10',
            'IE 11'
          ],
          cascade: false
        }
    ))
    .pipe(plugins.cssmin())
    .pipe(gulp.dest('./website/css')).on('error', gutil.log)
});
*/

gulp.task('webserver', function(){
  gulp.src('./')
    .pipe(plugins.webserver({
      fallback   : 'index.html',
      host       : 'localhost',
      livereload : true,
      open       : true
  }))
})

gulp.task('browserify',function(cb) {
  return browserify({
    entries: ['./js/index.js']
  })
  .transform('babelify', {
    presets: ['es2015', 'react']
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(plugins.addSrc('index.html'))
  .pipe(gulp.dest('./'))
});

gulp.task('build', function() {
  runSequence(
    ['browserify'],['less'],['webserver']
  );
});

gulp.task('watch', function(){
  gulp.watch(['./js/*.js','./less/*.less'],['less','browserify'])
})