const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  plugins: [
    new webpack.DefinePlugin({
      REPOSITORY: '"https://raw.githubusercontent.com/solflare-wallet/solana-programs/master/packages/solana-programs"',
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
