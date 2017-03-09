import {apply, compose, curry, flatten, prepend, tap, toPairs} from "ramda"

// redis helper - redis can't store dashes
const encode = (uuid) => uuid.replace("-", "_")

export default (store) => ({
  get: compose(
      store.hgetallAsync.bind(store),
      encode,
    ),
  set: curry((hash, obj) => 
      compose(
        apply(store.hsetAsync.bind(store)),
        prepend(encode(hash)),
        flatten,
        toPairs,
      )(obj)
    ),
})
