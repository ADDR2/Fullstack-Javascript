const webpack = require("webpack");
const path = require("path");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
  mode: process.env.NODE_ENV,
  entry: [ "@babel/polyfill", "./app/app.jsx" ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "app/components"),
      path.resolve(__dirname, "app/services"),
      path.resolve(__dirname, "app/reducers"),
      path.resolve(__dirname, "app/store"),
      path.resolve(__dirname, "app/router"),
      path.resolve(__dirname, "app/helpers")
    ],
    alias: {
      applicationStyles: __dirname + "/app/styles/app.scss"
    },
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  devtool:
    process.env.NODE_ENV === "production"
      ? undefined
      : "cheap-module-eval-source-map"
};
