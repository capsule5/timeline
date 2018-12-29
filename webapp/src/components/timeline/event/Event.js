import React from "react"
import "./Event.scss"

const Event = ({
  id, title, timeline, getEvent, isSelected,
}) => {
  const style = {
    backgroundColor: `${timeline.color_bg}`,
  }
  const classes = `button event ${isSelected && "event--selected"}`
  return (
    <div style={ { display: "flex", alignItems: "flex-start" } }>
      <div
        className={ classes }
        onClick={ (e) => {
          e.stopPropagation()
          e.preventDefault()
          getEvent({ id })
        } }
      >
        <span className="timeline-dot" style={ style } />
        <span className="event__title">{title}</span>
      </div>
    </div>
  )
}

export default Event
