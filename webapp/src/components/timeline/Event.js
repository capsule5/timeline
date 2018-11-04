import React from "react"

const Event = ({
  id, title, date_year, deleteEvent,
}) => {
  return (
    <span className="event">
      <span className="event__date">{date_year}</span> - {title}
      <button
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
