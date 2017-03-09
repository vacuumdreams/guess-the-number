import {curry, map, keys} from "ramda"

const useMethod = curry((path, route, server, method) => 
  server[method](path, route[method])
)

const useRoute = curry((routes, server, path) => 
  map(useMethod(path, routes[path], server), keys(routes[path])) 
)

export default curry((routes, server) => 
  map(useRoute(routes, server), keys(routes))
)

