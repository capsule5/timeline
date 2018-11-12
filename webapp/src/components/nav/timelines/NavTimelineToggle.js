import React, { Component } from "react"

class NavTimelineToggle extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      id, title, color_bg, toggleTimeline, selectedTimelines,
    } = this.props
    const isSelected = selectedTimelines.includes(id)
    const classNames = `nav__toggle ${isSelected && "nav__toggle--selected"}`
    const style = {
      backgroundColor: `#${color_bg}`,
    }

    return (
      <div
        className={ classNames }
        onClick={ () => {
          toggleTimeline({ id })
        } }
      >
        <span className="timeline-dot" style={ style } />
        {title}
      </div>
    )
  }
}
export default NavTimelineToggle
