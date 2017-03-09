import restify from "restify"
import {always, compose, tap} from "ramda"

import {attachMiddlewares, attachRouteHandlers} from "./core"

import middlewares from "./middlewares"
import routes from "./routes"

export default (config) =>
  compose(
    tap(attachRouteHandlers(routes(config))),
    tap(attachMiddlewares(middlewares(config))),
    always(restify.createServer()),
  )(config)

