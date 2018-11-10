import React, { Component } from "react"
import { connect } from "react-redux"
import Timeline from "./Timeline"
import { DELETE_EVENT } from "../../redux/events/actionTypes"

class TimelineProvider extends Component {
  render() {
    return <Timeline { ...this.props } />
  }
}

const mapStateToProps = state => ({
  events: state.events.data,
})

const mapDispatchToProps = dispatch => ({
  deleteEvent: action => dispatch({ type: DELETE_EVENT.REQUEST, action }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineProvider)
