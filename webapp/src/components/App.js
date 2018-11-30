import React, { Component } from "react"
import { connect } from "react-redux"
import TimelineProvider from "./timeline/TimelineProvider"
import EventFormProvider from "./ui/forms/event/EventFormProvider"
import TimelineFormProvider from "./ui/forms/timeline/TimelineFormProvider"
import FormDialog from "./ui/forms/FormDialog"
import NavTimelinesProvider from "./nav/timelines/NavTimelinesProvider"
import DetailEventProvider from "./detail/DetailEventProvider"
import { EventsStore, TimelinesStore } from "../redux/store"
import "./App.scss"

class App extends Component {
  componentWillMount() {
    this.initApp()
  }

  initApp() {
    const { fetchTimelines, fetchEventsByTimelinesIds } = this.props
    fetchTimelines()
    fetchEventsByTimelinesIds()
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

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  fetchTimelines: action => dispatch({ type: TimelinesStore.actions.FETCH.REQUEST, action }),
  fetchEventsByTimelinesIds: () => dispatch({ type: EventsStore.actions.FETCH_BY_TIMELINES_IDS.REQUEST }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
