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
          {events.map(({ id, ...event }) => {
            return (
              <Event
                { ...event }
                key={ `${id}` }
                id={ id }
                deleteEvent={ deleteEvent }
              />
            )
          })}
        </div>
      </>
    )
  }
}
