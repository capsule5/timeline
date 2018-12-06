import React, { Component } from "react"
import { formatMonth, formatDay } from "../../utils/date"
import "./DetailEvent.scss"
import DeleteButton from "../ui/buttons/DeleteButton"

class DetailEvent extends Component {
  renderDate() {
    const {
      date_year, date_month, date_day,
    } = this.props
    const d = date_day ? ` ${formatDay(date_day)} ` : ""
    const m = date_month ? ` ${formatMonth(date_month)} ` : ""
    const y = date_year ? ` ${date_year} ` : ""
    return y + m + d
  }

  render() {
    const {
      id, title, timeline = {}, deleteEvent,
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
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque incidunt similique iusto cumque amet
          dolorum excepturi voluptate, eos officiis sed culpa aut, voluptatem fugit, molestiae dolorem. Hic et aliquam
          unde!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure laudantium perspiciatis error et quasi, sequi
          sunt excepturi esse omnis, dignissimos doloribus accusantium aspernatur dolore, nostrum quas debitis unde
          officia pariatur.
        </p>
        <div>
          <DeleteButton id={ id } action={ deleteEvent } />
        </div>
      </div>
    )
  }
}
export default DetailEvent
