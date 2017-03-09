import {always, compose, isNil, mapObjIndexed, partial, tap, when} from "ramda"

export default (storage) => ({
  get: storage.getItem.bind(storage),
  update: mapObjIndexed((val, key) => storage.setItem.bind(storage)(key, val)),
  reset: storage.clear.bind(storage),
  getCreate: (key, defaultValue) => 
    compose(
        when(
          isNil,
          compose(
            tap(partial(storage.setItem.bind(storage), [key])),
            always(defaultValue),
          ) 
        ),
        storage.getItem.bind(storage),
    )(key),
})
