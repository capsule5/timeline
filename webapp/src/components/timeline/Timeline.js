import React, { PureComponent } from "react"
import "./Timeline.scss"

export default class Timeline extends PureComponent {
  componentWillMount() {
    const { fetchEvents } = this.props
    fetchEvents()
  }

  render() {
    const { events } = this.props
    return (
      <>
        <div className="events">
          {events.map(({ id, title }) => {
            return (
              <span key={ `${id}` } className="events__item">
                {title}
              </span>
            )
          })}
        </div>
      </>
    )
  }
}
