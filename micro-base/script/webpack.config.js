/**
 * @Describe: Describe
 * @Author: liuyang
 * @Date: 2020-02-28 10:24
 */
"use strict";
const path = require("path");
const fs = require("fs-extra");
const config = require("./config");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const isWsl = require("is-wsl/index");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 清空原文件
fs.emptyDirSync(path.join(process.cwd(), config.outputDir));
// 复制 public
fs.copySync(path.join(process.cwd(), "public"), path.join(process.cwd(), config.outputDir));
// 定义 BASE_URL
process.env.BASE_URL = "/" + config.outputDir;

const resolveApp = relativePath => path.resolve(fs.realpathSync(process.cwd()), relativePath);
const assetsPath = (_path) => path.join(config.publicPath, _path);

const shouldUseSourceMap = false;
const isEnvDevelopment = process.env.NODE_ENV === "development";
const isEnvProduction = process.env.NODE_ENV === "production";
module.exports = {
  mode: isEnvProduction ? "production" : isEnvDevelopment && "development",
  bail: isEnvProduction,
  devtool: isEnvProduction
  ? shouldUseSourceMap ? "source-map" : false
  : isEnvDevelopment && "cheap-module-source-map",
  entry: resolveApp("src/main.js"),
  output: {
    path: resolveApp(config.outputDir),
    pathinfo: isEnvDevelopment,
    filename: isEnvProduction
    ? assetsPath("js/app.[contenthash:8].js")
    : isEnvDevelopment && assetsPath("js/app.js"),
    publicPath: "/"
  },
  optimization: {
    minimize: isEnvProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: !isWsl,
        cache: true,
        sourceMap: isEnvProduction && shouldUseSourceMap,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: isEnvProduction && shouldUseSourceMap
          ? {
            inline: false,
            annotation: true,
          }
          : false,
        },
      }),
    ]
  },
  resolve: {
    modules: [ "node_modules", resolveApp("node_modules") ],
    extensions: [".js"],
    // 路径别名配置
    // alias: {}
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.css$/,
        use: [
          isEnvDevelopment && require.resolve("style-loader"),
          isEnvProduction && {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1,
              sourceMap: isEnvProduction && shouldUseSourceMap,
            },
          }
        ].filter(Boolean),
        sideEffects: true,
      },
      {
        loader: "file-loader",
        exclude: [ /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/, /\.css$/ ],
        options: {
          name: assetsPath("media/[name].[hash:8].[ext]"),
        }
      }
    ]
  },
  plugins: [
    // html模板处理插件
    new HtmlWebpackPlugin(
    Object.assign(
    {},
    {
      inject: true,
      template: "public/index.html"
    },
    isEnvProduction
    ? {
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }
    : undefined
    )
    ),
    // css抽离
    isEnvProduction &&
    new MiniCssExtractPlugin({
      filename: assetsPath("css/[id].[contenthash:8].css"),
      chunkFilename: assetsPath("css/[id].[contenthash:8].chunk.css"),
    }),
    // 环境变量定义插件
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
  ].filter(Boolean),
  node: {
    module: "empty",
    dgram: "empty",
    dns: "mock",
    fs: "empty",
    http2: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty",
  },
  performance: false
};
