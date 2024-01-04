import gulp from 'gulp';
import { path } from '../config/path.js';
import webpack from 'webpack-stream';
import { isBuild } from '../constants/index.js';

export const js = () => {
  return gulp
    .src(path.src.js)
    .pipe(
      webpack({
        mode: isBuild ? 'production' : 'development',
        target: isBuild ? 'browserslist' : 'web',
        devtool: isBuild ? undefined : 'source-map',
        output: {
          filename: 'index.min.js',
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(path.build.js));
};
