import restify from "restify"
import cors from "cors"

export default (config) => ([
  restify.bodyParser(),
  cors({origin: config.url}),
])
