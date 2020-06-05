const path = require('path');
const GasPlugin = require("gas-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: false,
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'babel-loader'
      },
    ]
  },
  resolve: {
    extensions: [
      '.ts',
      '.js'
    ],
    modules: ['node_modules']
  },
  mode: 'production',
  optimization: {
    usedExports: true, 
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 6,
          warnings: false,
          mangle: {},
          compress: {
            drop_console: false,
            drop_debugger: true,
          },
          output: {
            beautify: false,
          },
        },
      }),
    ]
  },
  plugins: [
    new GasPlugin()
  ]
};
