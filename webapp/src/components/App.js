import React, { Component } from "react"
import Button from "@material-ui/core/Button"
import TimelineProvider from "./timeline/TimelineProvider"
import EventFormProvider from "./ui/forms/event/EventFormProvider"
import TimelineFormProvider from "./ui/forms/timeline/TimelineFormProvider"
import { LoginFormProvider, RegisterFormProvider } from "./ui/forms/user"
import FormDialog from "./ui/forms/FormDialog"
import NavTimelinesProvider from "./nav/timelines/NavTimelinesProvider"
import DetailEventProvider from "./detail/DetailEventProvider"
import MainLayout from "./layouts/Main"

class App extends Component {
  renderNavAnon() {
    return (
      <>
        <FormDialog buttonText="login" formTitle="Login">
          <LoginFormProvider />
        </FormDialog>
        <FormDialog buttonText="register" formTitle="Register">
          <RegisterFormProvider />
        </FormDialog>
      </>
    )
  }

  renderNavAuth() {
    const {
      user: { firstName, lastName },
      logout,
    } = this.props
    return (
      <>
        <div className="nav__user">{`${firstName} ${lastName}`}</div>
        <div className="nav__logout">
          <Button
            onClick={ logout }
            variant="contained"
            color="primary"
            fullWidth
            className="form-dialog__button"
          >
          logout
          </Button>
        </div>
        <FormDialog buttonText="+ timeline" formTitle="New timeline">
          <TimelineFormProvider />
        </FormDialog>
        <FormDialog buttonText="+ event" formTitle="New event">
          <EventFormProvider />
        </FormDialog>
      </>
    )
  }

  renderNav() {
    const { isAuthenticated } = this.props
    return (
      <>
        {isAuthenticated ? this.renderNavAuth() : this.renderNavAnon()}
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
