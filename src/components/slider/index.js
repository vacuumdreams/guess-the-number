import React from "react"
import ReactSlider from "react-slider"

import styles from "./_component.scss"

export default function Slider(props) {
  return (
    <div className = {props.className}>
      <ReactSlider 
        className = {styles.slider}
        defaultValue = {props.value} 
        onChange = {props.handler}
        barClassName = {styles.sliderBar}
        withBars  
      >
        <div className = {styles.sliderHandler}>{props.value}</div>
      </ReactSlider>
    </div>
  )
}

Slider.propTypes = {
  className: React.PropTypes.string,
  value: React.PropTypes.number,
  handler: React.PropTypes.func.isRequired,
}
