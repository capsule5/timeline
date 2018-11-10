import React, { Component } from "react"
import { connect } from "react-redux"
import NavTimelines from "./NavTimelines"
import { TOGGLE_TIMELINE } from "../../../redux/timelines/actionTypes"

class NavTimelinesProvider extends Component {
  render() {
    return <NavTimelines { ...this.props } />
  }
}

const mapStateToProps = state => ({
  timelines: state.timelines.data,
  selectedTimelines: state.timelines.selected,
})

const mapDispatchToProps = dispatch => ({
  toggleTimeline: action => dispatch({ type: TOGGLE_TIMELINE.REQUEST, action }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavTimelinesProvider)
