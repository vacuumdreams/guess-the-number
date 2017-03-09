import {curry, map} from "ramda"

const useMiddleware = curry((server, middleware) => 
  server.use(middleware)
)

export default curry((middlewares, server) => 
  map(useMiddleware(server), middlewares)
)
