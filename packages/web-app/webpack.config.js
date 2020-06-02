const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const tauriMode = !!process.env.TAURI;

const webpackConfig = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? undefined : 'inline-source-map',
  devServer: {
    port: 3000,
  },
  cache: true,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
  ],
};

if (tauriMode) {
  const merge = require('webpack-merge');
  const tauriWebpackConfig = require('@tauri-apps/tauri-webpack').config();

  module.exports = merge(webpackConfig, tauriWebpackConfig);
} else {
  module.exports = webpackConfig;
}
