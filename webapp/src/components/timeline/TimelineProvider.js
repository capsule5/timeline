import React, { Component } from "react"
import { connect } from "react-redux"
import Timeline from "./Timeline"
import { EventsStore } from "../../redux/store"

class TimelineProvider extends Component {
  render() {
    return <Timeline { ...this.props } />
  }
}

const mapStateToProps = state => ({
  events: state.events.data,
})

const mapDispatchToProps = dispatch => ({
  deleteEvent: action => dispatch({ type: EventsStore.actions.DELETE.REQUEST, action }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineProvider)
