const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const resolveApp = (relativePath) => path.resolve(fs.realpathSync(process.cwd()), relativePath);

module.exports = {
  mode: process.env.NODE_ENV,
  entry: resolveApp("src/index.js"),
  output: {
    path: resolveApp("dist"),
    publicPath: "./",
    filename: "plan.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: resolveApp("public/index.html"),
    })
  ],
  devServer: {
    open: "http://127.0.0.1:5000",
    hot: true,
    historyApiFallback: true,
    publicPath: "/",
    host: "0.0.0.0",
    port: 5000,
    contentBase: resolveApp("public"),
    watchContentBase: true
  }
};
