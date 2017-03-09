import React from "react"

import Form from "../../../components/form"

import styles from "./_component.scss"

export default function GuessContainer (props) {
  return (
    <div className = {styles.container}>
      <Form 
        message = {props.message}
        messageType = {props.messageType}
        value = {props.value}
        onReset = {props.onReset}
        onSubmit = {props.onSubmit}
        onUpdate = {props.onUpdate}
        closeMessage = {props.onCloseMessage}
      >
        <p className = {styles.guesses}>Number of guesses left: {props.guessesLeft}</p>
      </Form>
    </div>
  )
}

GuessContainer.propTypes = {
  guessesLeft: React.PropTypes.number,
  message: React.PropTypes.string,
  messageType: React.PropTypes.oneOf(["", "success", "error"]),
  value: React.PropTypes.number,
  onSubmit: React.PropTypes.func.isRequired,
  onUpdate: React.PropTypes.func.isRequired,
  onReset: React.PropTypes.func.isRequired,
  onCloseMessage: React.PropTypes.func,
}
