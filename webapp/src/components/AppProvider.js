import React, { Component } from "react"
import { connect } from "react-redux"

import { EventsStore, UserStore } from "../redux/store"
import { timelinesSelector, eventsSelector, userSelector } from "../redux/selectors"
import App from "./App"
import "./App.scss"

class AppProvider extends Component {
  render() {
    return <App { ...this.props } />
  }
}

const mapStateToProps = state => ({
  timelines: timelinesSelector.getAll(state),
  firstTimelineId: timelinesSelector.getFirstId(state),
  firstEventId: eventsSelector.getFirstId(state),
  isShowSelected: eventsSelector.isShowSelected(state),
  isAuthenticated: userSelector.isAuthenticated(state),
  user: userSelector.getAuthenticated(state),
})

const mapDispatchToProps = dispatch => ({
  fetchEventsByTimelinesIds: () => dispatch({ type: EventsStore.actions.FETCH_BY_TIMELINES_IDS.REQUEST }),
  toggleSelectedEvent: action => dispatch({ type: EventsStore.actions.TOGGLE_SELECTED.REQUEST, action }),
  logout: () => dispatch({ type: UserStore.actions.LOGOUT.REQUEST }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppProvider)
