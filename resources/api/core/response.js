import {curry, map, pick} from "ramda"

const sendSuccess = curry(
  (res, data) => 
    res.send(data.status || 200, data)
)

const sendError = curry(
  (res, err) => 
    res.send(err.status || 500, pick(["message", "guesses"], err))
)

const catchAll = curry(
  (res, errors, data) => 
    map(data.catch, errors)
)

const process = (errors, process) => 
  ({body}, res) => 
    process(body)
      .then(sendSuccess(res))
      .then(catchAll(res, errors))


export {
  sendError,
  sendSuccess,
}
