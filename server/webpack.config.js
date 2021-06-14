const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: {
    app: "./index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      // 处理样式
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },

      // 处理图片
      {
        test: /\.(png|svg|jpj|gif)$/,
        use: ["file-loader"],
      },

      // 处理字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },

      // 处理数据
      { test: /\.(tsv|csv)$/, use: ["csv-loader"] },
      { test: /\.xml$/, use: ["xml-loader"] },
    ],
  },
};
