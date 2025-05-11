const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "assert": require.resolve("assert/"),
      "url": require.resolve("url/"),
      "util": require.resolve("util/")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ]
}; 