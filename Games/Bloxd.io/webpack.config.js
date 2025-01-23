const path = require('path');

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
};
