import React, { Component } from "react"
import { formatMonth, formatDay } from "../../utils/date"
import "./DetailEvent.scss"

class DetailEvent extends Component {
  renderDate() {
    const { date_year, date_month, date_day } = this.props
    const d = date_day ? ` ${formatDay(date_day)} ` : ""
    const m = date_month ? ` ${formatMonth(date_month)} ` : ""
    const y = date_year ? ` ${date_year} ` : ""
    return y + m + d
  }

  render() {
    const {
      id, title, date_reliability, timeline = {}, deleteEvent,
    } = this.props

    const style = {
      backgroundColor: timeline.color_bg,
    }

    return (
      <div className="detail-event">
        <div>
          <span className="timeline-dot" style={ style } /> {timeline.title}{" "}
        </div>
        <h2>{this.renderDate()}</h2>
        <h1>{title}</h1>
      </div>
    )
  }
}
export default DetailEvent
