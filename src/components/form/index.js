import React from "react"

import Slider from "../slider"
import Message from "../message"

import styles from "./_component.scss"

let timeoutCache

const handleClick = ({
  value, 
  messageType, 
  closeMessage, 
  onSubmit
}) => (e) => {
  e.preventDefault()
  clearTimeout(timeoutCache)
  if (messageType === "error") {
    timeoutCache = setTimeout(closeMessage, 3000)
  }
  onSubmit(value)
}

export default function Form (props) { 
  return (
    <form className = {styles.form}>
      
      <Message 
        type = {props.messageType}
        text = {props.message}
      />

      {props.children}

      <Slider 
        className = {styles.formSlider}
        value = {props.value} 
        handler = {props.onUpdate}
      />

      <button 
        className = {styles.formResetButton}
        onClick = {props.onReset}>
        Reset
      </button>

      <button 
        type = "submit" 
        className = {styles.formSubmitButton}
        onClick = {handleClick(props)}>
        Submit
      </button>
      
    </form>
  )
}

Form.propTypes = {
  children: React.PropTypes.object,
  message: React.PropTypes.string,
  messageType: React.PropTypes.oneOf(["", "success", "error"]),
  value: React.PropTypes.number,
  onSubmit: React.PropTypes.func.isRequired,
  onUpdate: React.PropTypes.func.isRequired,
  onReset: React.PropTypes.func.isRequired,
  closeMessage: React.PropTypes.func,
}
