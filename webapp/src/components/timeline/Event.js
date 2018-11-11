import React from "react"

const Event = ({
  id, title, date_year, date_month, date_day, date_reliability, timeline, deleteEvent,
}) => {
  return (
    <span className="event">
      <span className="event__label">{timeline.title}</span>
      <div className="event__date">{date_year}</div>
      <div className="event__title">{title}</div>
      <button
        className="event__delete"
        onClick={ () => {
          deleteEvent({ id })
        } }
        type="button"
      >
        x
      </button>
    </span>
  )
}

export default Event
