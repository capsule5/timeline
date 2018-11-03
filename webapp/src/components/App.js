import React, { Component } from "react"
import TimelineProvider from "./timeline/TimelineProvider"
import EventFormProvider from "./forms/event/EventFormProvider"
import "./App.scss"

class App extends Component {
  render() {
    return (
      <div className="App">
        <TimelineProvider />
        <EventFormProvider />
      </div>
    )
  }
}

export default App
