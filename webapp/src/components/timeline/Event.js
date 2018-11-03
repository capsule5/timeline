import React from "react"

const Event = ({ id, title, deleteEvent }) => {
  return (
    <span className="events__item">
      {title}
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
