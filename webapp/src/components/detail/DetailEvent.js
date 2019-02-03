import React, { Component } from "react"
import { formatMonth, formatDay } from "../../utils/date"
import "./DetailEvent.scss"
import DeleteButton from "../ui/buttons/DeleteButton"
import IsAuth from "../helpers/IsAuth"

class DetailEvent extends Component {
  renderDate() {
    const {
      dateYear, dateMonth, dateDay,
    } = this.props
    const d = dateDay ? ` ${formatDay(dateDay)} ` : ""
    const m = dateMonth ? ` ${formatMonth(dateMonth)} ` : ""
    const y = dateYear ? ` ${dateYear} ` : ""
    return y + m + d
  }

  render() {
    const {
      id, title, timeline = {}, deleteEvent,
    } = this.props

    const style = {
      backgroundColor: timeline.colorBg,
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
        <IsAuth>
          <div>
            <DeleteButton id={ id } action={ deleteEvent } />
          </div>
        </IsAuth>
      </div>
    )
  }
}
export default DetailEvent
