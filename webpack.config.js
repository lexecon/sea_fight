'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname + '/frontend',
  entry: './index.js',
  output: {
    path: __dirname + '/public',
    filename: 'index.js'
  },

  watch: NODE_ENV == 'development',
  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: ( NODE_ENV == 'development' ) ? 'source-map' : null,

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new ExtractTextPlugin('/css/[name].css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.jade',
      inject: false
    })
  ],

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },
  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader'],
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?optional[]=runtime'
      },
      {
        test: /\.jade$/,
        loader: 'jade'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 5 version')
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 5 version!sass')
      }
    ]
  },

  sassLoader: {
    indentedSyntax: true
  },

  devServer: {
    host: 'localhost',
    port: 8080
  }
};

if (NODE_ENV == 'production'){
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  )
}