import React, { Component } from "react"
import { connect } from "react-redux"
import TimelineForm from "./TimelineForm"
import { TimelinesStore } from "../../../../redux/store"

class TimelineFormProvider extends Component {
  render() {
    return <TimelineForm { ...this.props } />
  }
}

const mapStateToProps = state => ({
  timelines: state.timelines.data,
})

const mapDispatchToProps = dispatch => ({
  createTimeline: action => dispatch({ type: TimelinesStore.actions.CREATE.REQUEST, action }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineFormProvider)
