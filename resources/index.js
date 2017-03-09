"use strict"

import ENV from "./environment"

import createBundler from "./devserver"
import createApi from "./api"

import configDev from "../config/development"
import configProd from "../config/production"

const getPort = (url) => url.split(":")[2]

let config

// GET ENVIRONMENT CONFIG

switch (process.env.NODE_ENV) {
  case ENV.DEVELOPMENT:
    config = configDev
    break;
  case ENV.PRODUCTION:
    config = configProd
    break;
  default:
    config = configDev
}

if (config.env !== ENV.PRODUCTION) {
  const bundler = createBundler(config)
  bundler.listen(getPort(config.url))
}

const api = createApi(config)
api.listen(getPort(config.api.url))

