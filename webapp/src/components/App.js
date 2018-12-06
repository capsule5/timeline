import React, { Component } from "react"
import TimelineProvider from "./timeline/TimelineProvider"
import EventFormProvider from "./ui/forms/event/EventFormProvider"
import TimelineFormProvider from "./ui/forms/timeline/TimelineFormProvider"
import FormDialog from "./ui/forms/FormDialog"
import NavTimelinesProvider from "./nav/timelines/NavTimelinesProvider"
import DetailEventProvider from "./detail/DetailEventProvider"
import MainLayout from "./layouts/Main"

class App extends Component {
  renderNav() {
    return (
      <>
        <FormDialog buttonText="+ timeline" formTitle="New timeline">
          <TimelineFormProvider />
        </FormDialog>
        <FormDialog buttonText="+ event" formTitle="New event">
          <EventFormProvider />
        </FormDialog>
        <NavTimelinesProvider />
      </>
    )
  }

  render() {
    const { isShowSelected, toggleSelectedEvent } = this.props
    return (
      <MainLayout
        nav={ this.renderNav() }
        timeline={ <TimelineProvider /> }
        detail={ <DetailEventProvider /> }
        isShowSelected={ isShowSelected }
        toggleSelectedEvent={ toggleSelectedEvent }
      />
    )
  }
}
export default App
