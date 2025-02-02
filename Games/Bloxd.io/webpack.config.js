const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const currentDate = new Date().toISOString().split('T')[0];

const userscriptBanner = `// ==UserScript==
// @name         Melon Hub (bloxd.io)
// @namespace    https://github.com/OfficiallyMelon/Melon-Hub
// @version      v1.0
// @description  hack client for bloxd.io, open source on github.
// @author       melon
// @match        https://bloxd.io*
// @icon         https://bloxd.io*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

`;

module.exports = {
  mode: 'production',
  entry: './UI/UI.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: false,
          compress: false,
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: userscriptBanner,
      raw: true,
    }),
  ],
};
