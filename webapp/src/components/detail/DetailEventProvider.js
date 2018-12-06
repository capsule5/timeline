import React, { Component } from "react"
import { connect } from "react-redux"
import DetailEvent from "./DetailEvent"
import { eventsSelector } from "../../redux/selectors"
import { EventsStore } from "../../redux/store"

class DetailEventProvider extends Component {
  render() {
    const { selected, deleteEvent } = this.props
    return selected && (
    <DetailEvent
      { ...selected }
      deleteEvent={ deleteEvent }
    />
    )
  }
}

const mapStateToProps = state => ({
  selected: eventsSelector.getSelected(state),
})

const mapDispatchToProps = (dispatch) => {
  return {
    deleteEvent: action => dispatch({ type: EventsStore.actions.DELETE.REQUEST, action }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailEventProvider)
