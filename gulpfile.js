const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const fs = require('fs');
const gulp = require('gulp');
const minify = require('gulp-minify');

const sourceDir = 'src';
const outDir = 'build';

const concatJs = () => {
  return gulp.src([
    `${sourceDir}/js/*.js`,
    `${sourceDir}/index.js`,
  ]).pipe(concat('source.js'))
    .pipe(gulp.dest(outDir));
}

const minifyJs = () => {
  return gulp.src([
    `${outDir}/source.js`,
  ]).pipe(minify())

    .pipe(gulp.dest(outDir));
}

const prependUserScript = (sourceFileName, destFileName) => {
  return gulp.src([
    `${sourceDir}/userscript`,
    `${outDir}/${sourceFileName}`,
  ])
    .pipe(concat(destFileName))
    .pipe(gulp.dest('./'));
}

const prependUserScriptToMinifiedCode = () => {
  return prependUserScript("source-min.js", "index.min.js");
}

const prependUserScriptToCode = () => {
  return prependUserScript("source.js", "index.js");
}

const minifyCSS = () => {
  return gulp.src(`${sourceDir}/style.css`)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(outDir));
}

const addCssTo = (destFileName) => {
  const css = fs.readFileSync(`${outDir}/style.css`, 'utf8');

  const fileContent = `
const styleNode = document.createElement('style');
styleNode.type = 'text/css';
styleNode.innerText = '${css}';
document.head.appendChild(styleNode);`;
  fs.writeFileSync(`${outDir}/CSSInjector.js`, fileContent);

  return gulp.src([
    `${outDir}/${destFileName}`,
    `${outDir}/CSSInjector.js`,
  ]).pipe(concat(destFileName))
    .pipe(gulp.dest(outDir));
}

const addCssToMinifiedCode = () => {
  return addCssTo("source-min.js");
}

const addCssToCode = () => {
  return addCssTo("source.js");
}

const greasyForkBuild = gulp.series(
  concatJs,
  minifyCSS,
  addCssToCode,
  prependUserScriptToCode,
);

exports.prodBuild = gulp.series(
  concatJs,
  minifyJs,
  minifyCSS,
  addCssToMinifiedCode,
  prependUserScriptToMinifiedCode,

  greasyForkBuild,
);

exports.greasyForkBuild = greasyForkBuild;
