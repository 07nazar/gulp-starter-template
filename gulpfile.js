import gulp from 'gulp';
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

import { cleanBuild } from './gulp/tasks/clean.js';
import { html } from './gulp/tasks/html.js';
import { scss } from './gulp/tasks/scss.js';
import { images } from './gulp/tasks/images.js';
import { fonts } from './gulp/tasks/fonts.js';
import { server } from './gulp/tasks/server.js';
import { js } from './gulp/tasks/js.js';

const { series, parallel, watch } = gulp;

const reload = done => {
  plugins.browserSync.reload();
  done();
};

const watcher = () => {
  watch(path.watch.html, html);
  watch(path.watch.scss, scss);
  watch(path.watch.js, series(js, reload));
  watch(path.watch.images, series(images, reload));
};

const mainTasks = parallel(fonts, scss, html, js, images);
const startServer = parallel(server, watcher);

export const dev = series(cleanBuild, mainTasks, startServer);
export const build = series(cleanBuild, mainTasks);
