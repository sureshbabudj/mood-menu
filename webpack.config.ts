import path from "path";
import { Configuration, DefinePlugin } from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import { merge } from "webpack-merge";
import dotenv from "dotenv";
import CopyWebpackPlugin from "copy-webpack-plugin";

const env =
  dotenv.config({ path: path.resolve(__dirname, ".env") }).parsed || {};
if (process.env.NODE_ENV !== "production") {
  env.HOST = "http://localhost:5890";
}

console.log(JSON.stringify(env, null, 2));

// Common configuration
const commonConfig: Configuration = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /(\.scss$)|(\.css$)/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
    },
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "public" }],
    }),
    new HTMLWebpackPlugin({
      template: "./src/index.html", //source
      filename: "index.html", //destination
    }),
    new DefinePlugin({
      "process.env": JSON.stringify(env),
    }),
  ],
};

// Development configuration
const devConfig: Configuration = {
  mode: "development",
  devtool: "source-map",
  output: { publicPath: "/" },
};

// Production configuration
const prodConfig: Configuration = {
  mode: "production",
  devtool: false,
  // Add any production-specific plugins or settings here
};

// Export the merged configuration
const config: Configuration = merge(
  commonConfig,
  process.env.NODE_ENV === "production" ? prodConfig : devConfig
);

export default config;
