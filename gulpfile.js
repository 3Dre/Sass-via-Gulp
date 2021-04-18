const {src, dest, series ,parallel, watch} = require('gulp');

const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

const origin = 'src';
const destination = 'build';

function defaultTask(cb) {
    // place code for your default task here
    cb();
  }
function html(cb) {
   src(`${origin}/**/*.html`).pipe(dest(destination));
   cb();
 }
 function css(cb) {
  src(`${origin}/**/*.scss`)
  .pipe(sass({
    outputStyle: 'compressed'
  }))

  .pipe(dest(`${destination}/css`));

  cb();
}

function server(cb){
  browserSync.init({
    server: {
      baseDir: destination
    }
  })
  cb();
}

function watcher(cb) {
  watch(`${origin}/**/*.html`).on('change', series(html, browserSync.reload))
  cb();
}

function scssWatcher(cb) {
  watch(`${origin}/**/*.scss`).on('change', series(css, browserSync.reload))
  cb();
}
  exports.html = html; 
  exports.css = css; 
  exports.scssWatcher = scssWatcher;
  exports.default = series(html, css, server, watcher, scssWatcher);
