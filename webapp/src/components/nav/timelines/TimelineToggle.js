import React, { Component } from "react"

class TimelineToggle extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      id, title, color_bg, toggleTimeline, selectedTimelines, eventsCount,
    } = this.props
    const isSelected = selectedTimelines.includes(id)
    const classNames = `toggle ${isSelected && "toggle--selected"}`
    const style = {
      backgroundColor: `${color_bg}`,
    }

    return (
      <div
        className={ classNames }
        onClick={ () => {
          toggleTimeline({ id })
        } }
      >
        <span className="timeline-dot" style={ style } />
        {title} <span className="toggle__count">({eventsCount})</span>
      </div>
    )
  }
}
export default TimelineToggle
