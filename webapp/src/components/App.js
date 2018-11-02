import React, { Component } from "react"
import "./App.scss"
import Timeline from "./timeline/Timeline"
import EventForm from "./forms/event/EventForm"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Timeline />
        <EventForm />
      </div>
    )
  }
}

export default App
