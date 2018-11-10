import React, { Component } from "react"
import { connect } from "react-redux"
import TimelineProvider from "./timeline/TimelineProvider"
import EventFormProvider from "./forms/event/EventFormProvider"
import { FETCH_TIMELINES } from "../redux/timelines/actionTypes"
import "./App.scss"

class App extends Component {
  componentWillMount() {
    const { fetchTimelines } = this.props
    fetchTimelines()
  }

  render() {
    return (
      <div className="App">
        <TimelineProvider />
        <EventFormProvider />
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  fetchTimelines: action => dispatch({ type: FETCH_TIMELINES.REQUEST, action }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
