"use strict";

var gulp = require("gulp");
var php = require("gulp-connect-php");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var del = require("del");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var mqpacker = require("css-mqpacker");
var svgstore = require("gulp-svgstore");
var imagemin = require("gulp-imagemin");
var run = require("run-sequence");

gulp.task("clean", function() {
   return del("build");
});

gulp.task("style",function() {
  gulp.src("less/style.less")
   .pipe(plumber())
   .pipe(less())
   .pipe(postcss([
     autoprefixer({
     }),
     mqpacker({
       sort: false
     })
   ]))
   .pipe(gulp.dest("build/css"))
   .pipe(minify())
   .pipe(rename("style.min.css"))
   .pipe(gulp.dest("build/css"));
});

gulp.task("copy", function() {
    return gulp.src([
      "fonts/**/*.{woff,woff2}",
      "img/**",
      "js/**",
       "*.{html,php}"
     ], {
      base: "."
     })
     .pipe(gulp.dest("build"));
});

gulp.task("php", function() {
 php.server({
    base: "build", 
    port: 8010, 
    keepalive: true
 });
});