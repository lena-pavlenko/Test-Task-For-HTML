const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const browsersync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');

const paths = {
    html: {
        src: 'src/*.html',
        dest: 'dist/'
    },
    styles: {
        src: 'src/scss/**/style.scss',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'dist/js/'
    },
    images: {
        src: 'src/img/*',
        dest: 'dist/img'
    },
    fonts: {
        src: 'src/fonts/*',
        dest: 'dist/fonts'
    },
    ico: {
        src: '*.ico',
        dest: 'dist/'
    }
}
function ico() {
    return gulp.src(paths.ico.src)
    .pipe(gulp.dest(paths.ico.dest));
}

function html() {
    return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest));
}

function fonts() {
    return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
}

function styles() {
    return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browsersync.stream())
}

function scripts() {
    return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browsersync.stream())
}

// Сжатие изображений
function img() {
    return gulp.src(paths.images.src)
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest(paths.images.dest))
}

function watch() {
    browsersync.init({
        server: {
            baseDir: "./dist"
        }
    })
    gulp.watch(paths.html.dest).on('change', browsersync.reload)
    gulp.watch('src/**/*.scss', gulp.parallel(styles))
    gulp.watch(paths.scripts.src, scripts)
    gulp.watch(paths.images.src, img)
    gulp.watch(paths.html.src, html)
    gulp.watch(paths.fonts.src, fonts)
    gulp.watch(paths.ico.src, ico)
}

const build = gulp.series(clean, gulp.parallel(html, styles, scripts, img, fonts, ico), watch);

function clean() {
    return del(['dist'])
}

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.img = img;
exports.html = html;
exports.fonts = fonts;
exports.watch = watch;
exports.build = build;
exports.default = build;
