import React, { PureComponent } from "react"
import Event from "./Event"
import "./Timeline.scss"

export default class Timeline extends PureComponent {
  componentWillMount() {
    const { fetchEvents } = this.props
    fetchEvents()
  }

  render() {
    const { events, deleteEvent } = this.props
    return (
      <>
        <div className="events">
          {events.map(({ id, title }) => {
            return (
              <Event
                key={ `${id}` }
                id={ id }
                title={ title }
                deleteEvent={ deleteEvent }
              />
            )
          })}
        </div>
      </>
    )
  }
}
