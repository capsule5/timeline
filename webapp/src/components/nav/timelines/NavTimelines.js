import React, { PureComponent } from "react"
import "./NavTimelines.scss"
import NavTimelineToggle from "./NavTimelineToggle"

export default class NavTimelines extends PureComponent {
  render() {
    const { timelines, toggleTimeline, selectedTimelines } = this.props

    return (
      <div className="nav__timelines">
        {timelines.map(({ id, ...timeline }) => {
          return (
            <NavTimelineToggle
              key={ `${id}` }
              id={ id }
              { ...timeline }
              toggleTimeline={ toggleTimeline }
              selectedTimelines={ selectedTimelines }
            />
          )
        })}
      </div>
    )
  }
}
