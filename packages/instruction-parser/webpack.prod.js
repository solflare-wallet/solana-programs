const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin()],

    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: false
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      REPOSITORY: '"https://raw.githubusercontent.com/solflare-wallet/solana-programs/master/packages/solana-programs"',
    }),
  ],
};
