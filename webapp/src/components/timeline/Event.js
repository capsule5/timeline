import React from "react"

const Event = ({
  id, title, date_year, date_month, date_day, date_reliability, timeline, deleteEvent,
}) => {
  const style = {
    backgroundColor: `${timeline.color_bg}`,
  }
  return (
    <div className="event">
      
      <span className="event__date">{date_year}</span>
      <span className="event__title"><span className="timeline-dot" style={ style } /> {title}</span>
      <button
        className="event__delete"
        onClick={ () => {
          deleteEvent({ id })
        } }
        type="button"
      >
        x
      </button>
    </div>
  )
}

export default Event
