import gulp from 'gulp';
import { path } from '../config/path.js';

import clean from 'gulp-clean';

export const cleanBuild = () => {
  return gulp.src(path.clean, { allowEmpty: true }).pipe(clean());
};
