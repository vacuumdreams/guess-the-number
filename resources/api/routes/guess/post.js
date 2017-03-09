import { resolve } from "bluebird"
import { append, assoc, compose, equals, flip, last, length, lt, not, 
  propOr, tap, when } from "ramda"

import HIDDEN_NUMBER from "./data/hidden-number"
import { MaxGuessesError, NotMatchedError } from "../../errors"
import { sendError, sendSuccess } from "../../core"

const addNewGuessValue = (newValue) => compose(
  resolve,
  append(newValue),
  JSON.parse.bind(JSON),
  propOr("[]", "values"),
)

const validateNumberOfAttempts = (maxGuesses) => compose(
  resolve, 
  when(
    compose(lt(maxGuesses), length),
    (values) => {
      throw new MaxGuessesError(403, "Max number of guesses reached!", { guesses: values.length })
    },
  ),
)

const createResponseData = compose(
  flip(assoc("guesses"))({message: "You guessed the secret number! Well done!"}),
  length,
)

const validateGuessIsCorrect = (correct) => compose(
  resolve,
  createResponseData,
  when(
    compose(not, equals(parseInt(correct)), parseInt, last),
    (values) => {
      throw new NotMatchedError(401, "Number not matched! Please try again.", { guesses: values.length })
    },
  ),
)

const saveToDb = (id, dbService) => compose(
  dbService.set(id),
  flip(assoc("values"))({}),
  JSON.stringify.bind(JSON),
)

const updateDb = (id, dbService) => compose(
  resolve,
  tap(saveToDb(id, dbService)),
)

export default (maxGuesses, storeService) => 
  ({body}, res) => 
    storeService.get(body.uid)
      .then(addNewGuessValue(body.value))
      .then(validateNumberOfAttempts(maxGuesses))
      .then(updateDb(body.uid, storeService))
      .then(validateGuessIsCorrect(HIDDEN_NUMBER))

      .then(sendSuccess(res))
      .catch(MaxGuessesError, sendError(res))
      .catch(NotMatchedError, sendError(res))
      .catch(sendError(res))
