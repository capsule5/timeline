import React, { Component } from "react"
import Hidden from "@material-ui/core/Hidden"
import TimelineProvider from "./timeline/TimelineProvider"
import EventFormProvider from "./ui/forms/event/EventFormProvider"
import TimelineFormProvider from "./ui/forms/timeline/TimelineFormProvider"
import FormDialog from "./ui/forms/FormDialog"
import NavTimelinesProvider from "./nav/timelines/NavTimelinesProvider"
import DetailEventProvider from "./detail/DetailEventProvider"
import MainLayout from "./layouts/Main"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderNav() {
    return (
      <div className="">
        <FormDialog buttonText="+ timeline" formTitle="New timeline">
          <TimelineFormProvider />
        </FormDialog>
        <FormDialog buttonText="+ event" formTitle="New event">
          <EventFormProvider />
        </FormDialog>
        <NavTimelinesProvider />
      </div>
    )
  }

  renderMainContent() {
    return (
      <div className="App">
        <TimelineProvider />
        <Hidden smDown>
          <DetailEventProvider />
        </Hidden>
      </div>
    )
  }

  render() {
    return (
      <MainLayout
        nav={ this.renderNav() }
        mainContent={ this.renderMainContent() }
        detail={ <DetailEventProvider /> }
      />
    )
  }
}
export default App
