import React, { Component } from "react"
import { connect } from "react-redux"
import NavTimelines from "./NavTimelines"
import { TimelinesStore } from "../../../redux/store"

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
  toggleTimeline: action => dispatch({ type: TimelinesStore.actions.TOGGLE.REQUEST, action }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavTimelinesProvider)
