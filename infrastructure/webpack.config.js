const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'src');
const OUT_DIR = path.resolve(__dirname, 'build');

module.exports = {
  entry: {
    'origin-request': path.resolve(SRC_DIR, 'functions/origin-request'),
  },
  output: {
    path: OUT_DIR,
    filename: '[name]/[name].js',
    library: '[name]',
    libraryTarget: 'umd',
  },
  mode: 'development',
  optimization: {
    minimize: false,
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: { node: '18' },
                  modules: false,
                },
              ],
            ],
          },
        },
      },
    ],
  },
};
