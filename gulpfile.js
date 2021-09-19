const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const fs = require('fs');
const gulp = require('gulp');
const minify = require('gulp-minify');

const sourceDir = 'src';
const outDir = 'build';

const minifyAndConcatJs = () => {
  return gulp.src([
    `${sourceDir}/index.js`,
  ]).pipe(concat('source.js'))
    .pipe(minify())
    .pipe(gulp.dest(outDir));
}

const prependUserScript = () => {
  return gulp.src([
    `${sourceDir}/userscript`,
    `${outDir}/source-min.js`,
  ])
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./'));
}

const minifyCSS = () => {
  return gulp.src(`${sourceDir}/style.css`)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(outDir));
}

const addCSS = () => {
  const css = fs.readFileSync(`${outDir}/style.css`, 'utf8');

  const fileContent = `
const styleNode = document.createElement('style');
styleNode.type = 'text/css';
styleNode.innerText = '${css}';
document.head.appendChild(styleNode);`;
  fs.writeFileSync(`${outDir}/CSSInjector.js`, fileContent);

  return gulp.src([
    `${outDir}/source-min.js`,
    `${outDir}/CSSInjector.js`,
  ]).pipe(concat('source.js'))
    .pipe(minify())
    .pipe(gulp.dest(outDir));
}

exports.build = gulp.series(
  minifyAndConcatJs,
  minifyCSS,
  addCSS,
  prependUserScript,
);
