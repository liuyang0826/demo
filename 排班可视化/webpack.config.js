const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const resolveApp = (relativePath) => path.resolve(fs.realpathSync(process.cwd()), relativePath);

module.exports = {
  mode: "production",
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
    open: true,
    hot: true,
    historyApiFallback: true,
    publicPath: "/",
    port: 5000,
    contentBase: resolveApp("public"),
  }
};
