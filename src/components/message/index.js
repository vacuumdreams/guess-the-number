import React from "react"

import styles from "./_component.scss"

export default function Message (props) {
  return !props.text ? null : (
    <div className = {(props.type === "success") ? styles.messageSuccess : styles.messageError}>
      <p>{props.text}</p>
    </div>
  )
}

Message.propTypes = {
  text: React.PropTypes.string,
  type: React.PropTypes.oneOf(["", "success", "error"]),
}
