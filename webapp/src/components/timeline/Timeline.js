import React, { PureComponent } from "react"
import Event from "./Event"
import "./Timeline.scss"

export default class Timeline extends PureComponent {
  render() {
    const { events, deleteEvent } = this.props
    return (
      <div className="timeline__wrapper">
        <div className="timeline__content">
          {events.length ? (
            events.map(({ id, ...event }) => {
              return <Event { ...event } key={ `${id}` } id={ id } deleteEvent={ deleteEvent } />
            })
          ) : (
            <span>There’s no event to display!</span>
          )}
        </div>
      </div>
    )
  }
}
