import React, { Component } from "react"
import { connect } from "react-redux"
import NavTimelines from "./NavTimelines"
import { TimelinesStore } from "../../../redux/store"
import { timelinesSelector } from "../../../redux/selectors"

class NavTimelinesProvider extends Component {
  render() {
    return <NavTimelines { ...this.props } />
  }
}

const mapStateToProps = state => ({
  timelines: timelinesSelector.getAll(state),
  selectedTimelines: timelinesSelector.getSelected(state),
})

const mapDispatchToProps = dispatch => ({
  toggleTimeline: action => dispatch({ type: TimelinesStore.actions.TOGGLE.REQUEST, action }),
  deleteTimeline: action => dispatch({ type: TimelinesStore.actions.DELETE.REQUEST, action }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavTimelinesProvider)
