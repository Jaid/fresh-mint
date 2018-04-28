import gulp from "gulp"
import gulpClean from "gulp-clean"
import gulpWebpack from "webpack-stream"
import webpack from "webpack"

gulp.task("clean", () => gulp.src(["./build/"], {
    read: false,
    allowEmpty: true
})
    .pipe(gulpClean()))

/*
 * Doesn't work
 * "Support for the experimental syntax 'classProperties' isn't currently enabled (5:22)"
 * Seems to be a weird collision with the @babel/register parser
 */
gulp.task("build", () => gulp.src("../src/index.jsx")
    .pipe(gulpWebpack(require("./webpack.babel"), webpack))
    .pipe(gulp.dest("../build")))
