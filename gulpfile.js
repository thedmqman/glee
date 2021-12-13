const { src, dest, watch, parallel, series } = require('gulp');

const scss          = require('gulp-sass')(require('sass'));
const concat        = require('gulp-concat');
const browserSync   = require('browser-sync').create();
const uglify        = require('gulp-uglify-es').default;
const autoprefixer  = require('gulp-autoprefixer');
const imagemin      = require ('gulp-imagemin');
const del           = require('del');
const ttf2woff      = require('gulp-ttf2woff');
const ttf2woff2     = require('gulp-ttf2woff2');
const fs            = require('file-system'); 


function browsersync() {
    browserSync.init({
        server: "./app"
    });
}

function cleanDist() {
    return del('dist')
}

function fonts() {
    src('app/fonts/*.ttf')
    .pipe(ttf2woff())
        .pipe(dest('dist/fonts/'));
    return src('app/fonts/*.ttf')
        .pipe(ttf2woff2())
        .pipe(dest('dist/fonts/'));
}

function images() {
    return src('app/images/**/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
        .pipe(dest('dist/images'))
}

function scripts() {
    return src([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/slick-carousel/slick/slick.js',
      'node_modules/mixitup/dist/mixitup.js',
      'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
      'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
      'node_modules/rateyo/src/jquery.rateyo.js',
      'app/js/main.js'
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
    } 

function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function build() {
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*.',
        'app/js/main.min.js',
        'app/*.html'
    ], {base: 'app'})
    .pipe(dest('dist'))
}

function fontsStyles() {
    let file_content = fs.readFileSync('app/scss/fonts.scss');
    if (file_content == '') {
        fs.writeFile('app/scss/fonts.scss', '', cb);
        return fs.readdir(('dist/fonts'), function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile('app/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}

function cb() {
    
}

function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/main.js'], scripts);
    watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.fonts = fonts
exports.fontsStyles = fontsStyles;

exports.build = series(cleanDist, images, build, fonts,), fontsStyles;
exports.default = parallel(styles, scripts, browsersync, watching);