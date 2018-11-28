import React from "react"
import DeleteButton from "../ui/buttons/DeleteButton"
import { getMonth } from "../../utils/date"

const Event = ({
  id, title, date_year, date_month, date_day, date_reliability, timeline, deleteEvent,
}) => {
  const style = {
    backgroundColor: `${timeline.color_bg}`,
  }
  return (
    <div className="event">
      {/* <div className="event__date">
        <div className="year">{date_year}</div>
        <div className="month">{getMonth(date_month)}</div>
        <div className="day">{date_day}</div>
      </div> */}
      <span className="event__title">
        <span className="timeline-dot" style={ style } /> {title}
      </span>
      <DeleteButton id={ id } action={ deleteEvent } />
    </div>
  )
}

export default Event
