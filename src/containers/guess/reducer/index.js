import {isNil} from "ramda"
import {
  SEND_GUESS_RANGE_REQUEST,
  SEND_GUESS_RANGE_SUCCESS,
  SEND_GUESS_RANGE_FAILURE,
  UPDATE_GUESS_VALUE,
  CLOSE_GUESS_MESSAGE,
  RESET_GUESSES,
} from "../../../app/constants"
import defaultState from "../state"

export default (state = defaultState, action) => {
  switch (action.type) {
    case SEND_GUESS_RANGE_REQUEST:
      return {
        ...state, 
        status: action.status,
        value: action.value,
      }
    case SEND_GUESS_RANGE_SUCCESS:
      return {
        ...state,
        status: action.status,
        guesses: isNil(action.guesses) ? state.guesses : action.guesses,
        message: action.message,
        messageType: action.messageType,
      }
    case SEND_GUESS_RANGE_FAILURE:
      return {
        ...state,
        status: action.status,
        guesses: isNil(action.guesses) ? state.guesses : action.guesses,
        message: action.message,
        messageType: action.messageType,
      }
    case UPDATE_GUESS_VALUE:
      return {
        ...state,
        value: action.value,
      }
    case CLOSE_GUESS_MESSAGE:
      return {
        ...state,
        status: action.status,
        message: action.message,
        messageType: action.messageType,
      }
    case RESET_GUESSES:
      return {
        ...state,
        user: action.user,
        guesses: action.guesses,
        status: action.status,
        message: action.message,
        messageType: action.messageType,        
      }
    default:
      return {...state}
  }
}
