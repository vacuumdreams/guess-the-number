import {compose} from "ramda"

import init from "./init"
import adapter from "./adapter"

export default compose(
  adapter,
  init,
)
