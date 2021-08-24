const path = require('path');
// const { ModuleFilenameHelpers } = require('webpack');

const HTMLWebpackPlugin = require('html-webpack-plugin');

// Webpack config settings export

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build'),
    publicPath: '/build',
  },
  module: {
    rules: [{
      test: /\.jsx?/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    }],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '/client'),
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './client/index.html',
    }),
  ],
};

// module.exports = {
//   entry: './client/index.js',
//   output: {
//     path: path.join(__dirname, '/build'),
//     filename: 'bundle.js',
//     publicPath: '/build/',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.jsx?/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env', '@babel/preset-react'],
//           },
//         },
//       },
//     ],
//   },
//   devServer: {
//     static: {
//       directory: path.join(__dirname, '/client'),
//     },
//   },
// };
