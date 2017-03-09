import {compose, converge, ifElse, gte, lte, pick, or, tap} from "ramda"

const isSuccess = compose(
  converge(or, [gte(200), lte(299)]),
  pick(["status"]),
)

const updateStorage = (storage, values) => tap(compose(
  storage.update,
  pick(values),
))

const handleResponse = (storage, max, success, error) => compose(
  ifElse(
    isSuccess,
    compose(
      success, 
      updateStorage(storage, ["guesses", "message"]),
    ),
    compose(
      error, 
      updateStorage(storage, ["guesses"]),
    ),
  ),
)

export {
  handleResponse,
}