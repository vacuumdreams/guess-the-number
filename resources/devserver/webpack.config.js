import {compose, prop, propOr} from "ramda"

import path from "path"
import autoprefixer from "autoprefixer"
import ExtractTextPlugin from "extract-text-webpack-plugin"

import ENV from "../environment"

const PATHS = {
  ROOT: "../..",
  DEVSERVER: ".",
  OUTPUT: "assets",
}

const getPath = (notation = "") => path.join(__dirname, notation)

const getConfigPath = compose(
  getPath, 
  (file) => `${PATHS.ROOT}/config/${file}.json`, 
  propOr("development", "env")
)

export default (env) => ({
  devtool: (env.env !== ENV.PRODUCTION) ? "source-map": void 0,
  progress: true,
  colors: true,
  env: env.env || "default",

  entry: [
    "whatwg-fetch",
    "bluebird",
    getPath(`${PATHS.ROOT}/src/index.js`),
  ],
  output: {
    path: getPath(`${PATHS.ROOT}/${PATHS.OUTPUT}/`),
    // publicPath: env.bundler.url + `/${PATHS.OUTPUT}/`,
    filename: "bundle.js",
  },

  resolve: {
    alias: {
      config: getConfigPath(env),
    },
  },

  module: {
    loaders: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: "babel",
      },
      {
        test: /\.(json)$/,
        exclude: /node_modules/,
        loader: "json",
      },
      {
        test: /(index.scss)$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style", 
          loader: "css?sourceMap!sass?sourceMap!postcss",
        }),
      },
      {
        test: /(_component.scss)$/,
        loader: "style?sourceMap!css?modules&importLoaders=1&sourceMap&localIdentName=[path]___[name]__[local]___[hash:base64:5]!sass!postcss",
      },
      {
        test: /\.(mst)$/,
        exclude: /node_modules/,
        loader: "mustache",
      },
      {
        test: /\.(jpg|png|gif)$/,
        exclude: /node_modules/,
        loader: "file",
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin("[name].css"),
  ],

  htmlPlugin: {
    title: env.title || "Untitled",
    inject: false,
    faviconPath: `/${PATHS.OUTPUT}/favicon.png`,
    filename: "index.html",
    template: getPath(`${PATHS.DEVSERVER}/static/index.mst`),
  },

  devServer: {
    hot: env.env !== ENV.PRODUCTION,
    contentBase: getPath(`${PATHS.ROOT}/${PATHS.OUTPUT}`),
    filename: "bundle.js",
    // publicPath: `/${PATHS.OUTPUT}/`,
    stats: {
      progress: true,
      colors: true,
    },
    historyApiFallback: true,
  },

  postcss: () => [autoprefixer()],
})

export {PATHS}
