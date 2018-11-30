import React, { Component } from "react"
import { connect } from "react-redux"
import TimelineProvider from "./timeline/TimelineProvider"
import EventFormProvider from "./ui/forms/event/EventFormProvider"
import TimelineFormProvider from "./ui/forms/timeline/TimelineFormProvider"
import FormDialog from "./ui/forms/FormDialog"
import NavTimelinesProvider from "./nav/timelines/NavTimelinesProvider"
import DetailEventProvider from "./detail/DetailEventProvider"
import { EventsStore, TimelinesStore } from "../redux/store"
import { timelinesSelector, eventsSelector } from "../redux/selectors"
import "./App.scss"

class App extends Component {
  componentDidMount() {
    const { fetchTimelines } = this.props
    fetchTimelines()
  }

  componentWillReceiveProps(nextProps) {
    const {
      timelines, toggleTimeline, events, getEvent,
    } = this.props
    // at start toggle first timeline
    if (timelines.length === 0 && nextProps.timelines.length > 0) {
      toggleTimeline({ id: nextProps.firstTimelineId })
    }
    // select first event
    if (events.length === 0 && nextProps.events.length > 0) {
      getEvent({ id: nextProps.firstEventId })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="forms">
          <FormDialog buttonText="+ timeline" formTitle="New timeline">
            <TimelineFormProvider />
          </FormDialog>
          <FormDialog buttonText="+ event" formTitle="New event">
            <EventFormProvider />
          </FormDialog>
        </div>
        <NavTimelinesProvider />
        <TimelineProvider />
        <DetailEventProvider />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  timelines: timelinesSelector.getAll(state),
  firstTimelineId: timelinesSelector.getFirstId(state),
  events: eventsSelector.getAll(state),
  firstEventId: eventsSelector.getFirstId(state),
})

const mapDispatchToProps = dispatch => ({
  fetchTimelines: action => dispatch({ type: TimelinesStore.actions.FETCH.REQUEST, action }),
  toggleTimeline: action => dispatch({ type: TimelinesStore.actions.TOGGLE.REQUEST, action }),
  fetchEventsByTimelinesIds: () => dispatch({ type: EventsStore.actions.FETCH_BY_TIMELINES_IDS.REQUEST }),
  getEvent: action => dispatch({ type: EventsStore.actions.GET.REQUEST, action }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
