import React, { Component } from "react"
import { connect } from "react-redux"
import Timeline from "./Timeline"
import { FETCH_EVENTS_BY_TIMELINES_IDS, DELETE_EVENT } from "../../redux/events/actionTypes"

class TimelineProvider extends Component {
  render() {
    return <Timeline { ...this.props } />
  }
}

const mapStateToProps = state => ({
  events: state.events.data,
})

const mapDispatchToProps = dispatch => ({
  fetchEventsByTimelinesIds: action => dispatch({ type: FETCH_EVENTS_BY_TIMELINES_IDS.REQUEST, action }),
  deleteEvent: action => dispatch({ type: DELETE_EVENT.REQUEST, action }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineProvider)
