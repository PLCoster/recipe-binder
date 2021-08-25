const path = require('path');
// const { ModuleFilenameHelpers } = require('webpack');

const HTMLWebpackPlugin = require('html-webpack-plugin');

// Webpack config settings export

module.exports = {
  entry: './client/index.jsx',
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
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
      },
      '/login': {
        target: 'http://localhost:3000/',
      },
      '/signup': {
        target: 'http://localhost:3000/',
      },
    },
  },
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
