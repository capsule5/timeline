import React, { PureComponent } from "react"
import "./NavTimelines.scss"
import TimelineToggle from "./TimelineToggle"
import DeleteButton from "../../ui/buttons/DeleteButton"
import IsAuth from "../../helpers/IsAuth"

export default class NavTimelines extends PureComponent {
  render() {
    const {
      timelines, toggleTimeline, selectedTimelines, deleteTimeline,
    } = this.props

    return (
      <div className="nav__timelines">
        {timelines.map(({ id, ...timeline }) => {
          return (
            <div className="nav__timeline" key={ `${id}` }>
              <TimelineToggle
                id={ id }
                { ...timeline }
                toggleTimeline={ toggleTimeline }
                selectedTimelines={ selectedTimelines }
              />
              <IsAuth>
                <DeleteButton id={ id } action={ deleteTimeline } />
              </IsAuth>
            </div>
          )
        })}
      </div>
    )
  }
}
