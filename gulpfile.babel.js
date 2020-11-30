import CONFIG from './WORKFLOWCONFIG.json';

import gulp from 'gulp';
import babel from 'gulp-babel';
import terser from 'gulp-terser';
import concat from 'gulp-concat';
import ts from 'gulp-typescript';
import rename from 'gulp-rename'

// Para usar typescript
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import tsify from 'tsify';

// Uglify
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import buffer from 'vinyl-buffer';

// css
import postcss from 'gulp-postcss'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'

// Sass
import sass from 'gulp-sass'

// Clean css
import clean from 'gulp-purgecss'

// Image Min
import imagemin from 'gulp-imagemin'

// Browser sync
import { init as server, stream, reload } from 'browser-sync'
const browserSync = require('browser-sync')


console.log(CONFIG.theme_route)

// Variables
const tsProject  = ts.createProject('tsconfig.json')
const cssPlugins = [
  cssnano(),
  autoprefixer()
]

gulp.task("typescript", gulp.series( () => {
    return browserify({
      basedir: ".",
      debug: true,
      entries: [CONFIG.script_source_file],
      cache: {},
      packageCache: {},
    })
      .plugin(tsify)
      .transform("babelify", {
        presets: ["@babel/env"],
        extensions: [".ts", ".js"],
      })
      .bundle()
      .pipe(source(CONFIG.script_bundle_name))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      // .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest(CONFIG.script_dest));
  })
);

/*----------  Subsection comment block  ----------*/

gulp.task('styles_scss', () => {
  return gulp
    .src(CONFIG.style_source_file)
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(postcss(cssPlugins))
    .pipe(rename(CONFIG.style_bundle_name))
    .pipe(gulp.dest(CONFIG.style_dest))
})


/*----------  Remove unused styles  ----------*/
gulp.task('clean', () => {
  return gulp
    .src(CONFIG.style_dest+'/'+CONFIG.style_bundle_name)
    .pipe(clean({
      content: [CONFIG.theme_route+'/*.php', CONFIG.theme_route+'/*.html']
    }))
    .pipe(gulp.dest(CONFIG.style_dest))

})

/*----------  Reduce the  image weight  ----------*/

gulp.task('imgmin', () => {
  return gulp.src(CONFIG.images_src)
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 30, progresive: true}),
      imagemin.optipng({optimizationLevel: 1})
    ]))
    .pipe(gulp.dest(CONFIG.images_dest))
})


gulp.task('browsersync', () => {
  const files = [
    CONFIG.images_dest+'/*',
    CONFIG.style_dest+'/*.css',
    CONFIG.script_dest+'/*.js',
    CONFIG.theme_route+'/*.php',
    CONFIG.theme_route+'/*.html'
  ]

  browserSync.init(files, {
    proxy: "http://localhost:8888/workflow-wordpress-typescript-sass-gulp/",
    notify: false
  })
})

gulp.task('views', () => {
  return gulp.src(CONFIG.theme_route+'/*.php')
})

gulp.task('watch', () => {
  // server({
  //   server: './'
  // })

  // gulp.watch(CONFIG.theme_route, gulp.series('views', 'browsersync'))

  gulp.watch(CONFIG.script_source_file, gulp.series('typescript'))
  gulp.watch(CONFIG.style_source_file, gulp.series('styles_scss'))
})
