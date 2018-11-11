import React, { Component } from "react"
import { connect } from "react-redux"
import EventForm from "./EventForm"
import { EventsStore } from "../../../../redux/store"

class EventFormProvider extends Component {
  render() {
    return <EventForm { ...this.props } />
  }
}

const mapStateToProps = state => ({
  timelines: state.timelines.data,
})

const mapDispatchToProps = dispatch => ({
  createEvent: action => dispatch({ type: EventsStore.actions.CREATE.REQUEST, action }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventFormProvider)
