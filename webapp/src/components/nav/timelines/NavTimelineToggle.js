import React, { Component } from "react"

class NavTimelineToggle extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      id, title, toggleTimeline, selectedTimelines,
    } = this.props
    const isSelected = selectedTimelines.includes(id)
    const classNames = `nav__toggle ${isSelected && "nav__toggle--selected"}`

    return (
      <div
        className={ classNames }
        onClick={ () => {
          toggleTimeline({ id })
        } }
      >
        {title}
      </div>
    )
  }
}
export default NavTimelineToggle
