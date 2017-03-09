import {applySpec} from "ramda"

import guess from "./guess"
import {storage} from "../services"

export default applySpec({
  "/guess": config => guess(config.guesses.max, storage(config)),
})
