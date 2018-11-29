import React from "react"
import DeleteButton from "../ui/buttons/DeleteButton"

const Event = ({
  id, title, timeline, deleteEvent, getEvent, isSelected,
}) => {
  const style = {
    backgroundColor: `${timeline.color_bg}`,
  }
  const classes = `event ${isSelected && "event--selected"}`
  return (
    <div
      className={ classes }
      onClick={ () => {
        getEvent({ id })
      } }
    >
      <span className="timeline-dot" style={ style } />
      <span className="event__title">{title}</span>
      <DeleteButton id={ id } action={ deleteEvent } />
    </div>
  )
}

export default Event
