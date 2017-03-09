import {compose, equals, ifElse, prop, propOr, tap} from "ramda"

import path from "path"
import express from "express"
import webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"
import HtmlWebpackPlugin from "html-webpack-plugin"

import ENV from "../environment"
import getWebpackConfig, {PATHS} from "./webpack.config"

const staticMiddleware = express.static(path.join(__dirname, "../../../../../assets"))
const isProduction = compose(equals(ENV.PRODUCTION), prop("env"))

const attachEntries = (config) => ([
  ...propOr([], "entries", config),
  "webpack-dev-server/client?" + config.url,
  "webpack/hot/dev-server"
])

const getPlugins = (config) => ([
  ...propOr([], "plugins", config),
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin(config.htmlPlugin),
])

const alter = (config) => ({
  ...config,
  entries: attachEntries(config),
  plugins: getPlugins(config),
})

const createWpDevServer = compose(
  tap((server) => server.use(`/${PATHS.OUTPUT}`, staticMiddleware)),
  (config) => new WebpackDevServer(
    compose(webpack, alter)(config), 
    prop("devServer", config),
  ),
)

export default compose(
  // ifElse(
  //   isProduction,
  //   webpack,
  //   createWpDevServer,
  // ),
  createWpDevServer,
  getWebpackConfig,
)
