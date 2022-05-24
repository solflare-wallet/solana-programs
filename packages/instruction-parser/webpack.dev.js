const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  plugins: [
    new webpack.DefinePlugin({
      REPOSITORY: '"http://localhost:8080"',
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 4200,
    open: true
  },
  optimization: {
    minimize: false
  }
};
