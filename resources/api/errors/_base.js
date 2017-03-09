export default class BaseError extends Error {
  constructor(status, message, {guesses}) {
    super()
    this.status = status
    this.message = message
    this.guesses = guesses
    Error.captureStackTrace(this, this.constructor)
  }
}