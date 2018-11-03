import React, { Component } from "react"
import { connect } from "react-redux"
import Timeline from "./Timeline"
import { FETCH_EVENTS } from "../../redux/events/actionTypes"

class TimelineProvider extends Component {
  render() {
    return <Timeline { ...this.props } />
  }
}

const mapStateToProps = state => ({
  events: state.events.data,
})

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch({ type: FETCH_EVENTS.REQUEST }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineProvider)
