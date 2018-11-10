import React, { Component } from "react"
import { connect } from "react-redux"
import TimelineProvider from "./timeline/TimelineProvider"
import EventFormProvider from "./ui/forms/event/EventFormProvider"
import NavTimelinesProvider from "./nav/timelines/NavTimelinesProvider"
import { FETCH_TIMELINES } from "../redux/timelines/actionTypes"
import { FETCH_EVENTS_BY_TIMELINES_IDS } from "../redux/events/actionTypes"
import "./App.scss"

class App extends Component {
  componentWillMount() {
    const { fetchTimelines, fetchEventsByTimelinesIds } = this.props
    fetchTimelines()
    fetchEventsByTimelinesIds()
  }

  render() {
    return (
      <div className="App">
        <NavTimelinesProvider />
        <TimelineProvider />
        <EventFormProvider />
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  fetchTimelines: action => dispatch({ type: FETCH_TIMELINES.REQUEST, action }),
  fetchEventsByTimelinesIds: () => dispatch({ type: FETCH_EVENTS_BY_TIMELINES_IDS.REQUEST }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
