import {always, compose} from "ramda"
import {
  SEND_GUESS_RANGE_REQUEST,
  SEND_GUESS_RANGE_SUCCESS,
  SEND_GUESS_RANGE_FAILURE,
  UPDATE_GUESS_VALUE,
  CLOSE_GUESS_MESSAGE,
  RESET_GUESSES,
} from "../../../app/constants"
import config from "config"
import { request } from "../../../app/core"
import { serviceStorage } from "../../../app/services"
import { handleResponse } from "./utils"

import uuid from "uuid"

const sendGuessRangeSuccess = ({message, guesses}) => ({
  type: SEND_GUESS_RANGE_SUCCESS,
  status: "",
  guesses,
  message,
  messageType: "success",
})

const sendGuessRangeFailure = ({message, guesses}) => ({
  type: SEND_GUESS_RANGE_FAILURE,
  status: "",
  guesses,
  message,
  messageType: "error",
})

const sendGuessRangeRequest = (value) => ({
  type: SEND_GUESS_RANGE_REQUEST,
  status: "fetching",
  value,
})

const sendGuessRange = (value) => (dispatch, getState) => {
  dispatch(sendGuessRangeRequest(getState().value))
  request(`${config.api.url}/guess`, {uid: getState().user, value})
  .then(compose(
    dispatch,
    handleResponse(
      serviceStorage, 
      config.guesses.max, 
      sendGuessRangeSuccess, 
      sendGuessRangeFailure
    ),
  ))
  .catch(compose(
    dispatch, 
    sendGuessRangeFailure,
    always({
      message: "Something went wrong. Please try again later.",
    })
  ))
}

const updateGuessValue = (value) => ({
  type: UPDATE_GUESS_VALUE,
  value,
})

const closeGuessMessage = () => ({
  type: CLOSE_GUESS_MESSAGE,
  status: "",
  message: "",
  messageType: "",
})

const resetGuesses = () => (dispatch) => {
  serviceStorage.reset()
  dispatch(() => ({
    type: RESET_GUESSES,
    user: uuid.v4(),
    guesses: 0,
    status: "",
    message: "",
    messageType: "",
  }))
}

export {
  sendGuessRange,
  updateGuessValue,
  closeGuessMessage,
  resetGuesses,
}
