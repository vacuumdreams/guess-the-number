import { createStore } from "redux"
import { connect } from "react-redux"

import config from "config"
import defaultState from "./state"
import reducer from "./reducer"
import {
  sendGuessRange,
  updateGuessValue,
  closeGuessMessage,
  resetGuesses,
} from "./actions"
import GuessComponent from "./component"

const selector = (state) => ({
  guessesLeft: Math.max(0, config.guesses.max - state.guesses),
  value: state.value,
  message: state.message,
  messageType: state.messageType,
})

const dispatcher = (dispatch) => ({
  onSubmit(value) {
    dispatch(sendGuessRange(value))
  },
  onUpdate(value) {
    dispatch(updateGuessValue(value))
  },
  onCloseMessage() {
    dispatch(closeGuessMessage())
  },
  onReset() {
    dispatch(resetGuesses())
  }
})

export default {
  connect: () => connect(selector, dispatcher)(GuessComponent),
  getStore: (middlewares) => createStore(reducer, defaultState, middlewares),
}
