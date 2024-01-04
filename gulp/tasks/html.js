import gulp from 'gulp';
import fileinclude from 'gulp-file-include';
import htmlmin from 'gulp-htmlmin';

import { path } from '../config/path.js';
import { isBuild } from '../constants/index.js';
import { plugins } from '../config/plugins.js';

export const html = () => {
  return gulp
    .src(path.src.html)
    .pipe(fileinclude())
    .pipe(
      plugins.gulpIf(
        isBuild,
        htmlmin({
          collapseWhitespace: true,
          removeComments: true,
        })
      )
    )
    .pipe(gulp.dest(path.build.html))
    .pipe(plugins.browserSync.stream());
};
