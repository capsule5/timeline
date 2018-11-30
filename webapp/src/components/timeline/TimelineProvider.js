import React, { Component } from "react"
import { connect } from "react-redux"
import Timeline from "./Timeline"
import { EventsStore } from "../../redux/store"
import { eventsSelector } from "../../redux/selectors"

class TimelineProvider extends Component {
  render() {
    return <Timeline { ...this.props } />
  }
}

const mapStateToProps = state => ({
  selectedEventId: eventsSelector.getSelectedId(state),
  eventsByDate: eventsSelector.getAllByDate(state),
})

const mapDispatchToProps = dispatch => ({
  deleteEvent: action => dispatch({ type: EventsStore.actions.DELETE.REQUEST, action }),
  getEvent: action => dispatch({ type: EventsStore.actions.GET.REQUEST, action }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineProvider)
