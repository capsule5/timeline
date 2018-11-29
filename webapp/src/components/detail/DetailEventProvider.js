import React, { Component } from "react"
import { connect } from "react-redux"
import DetailEvent from "./DetailEvent"
import { EventsStore } from "../../redux/store"

class DetailEventProvider extends Component {
  componentWillMount() {
    const { getEvent } = this.props
    getEvent({ id: 1 })
  }

  render() {
    const { selected } = this.props
    return <DetailEvent { ...selected } />
  }
}

const mapStateToProps = state => ({
  selected: state.events.selected,
})

const mapDispatchToProps = dispatch => ({
  getEvent: action => dispatch({ type: EventsStore.actions.GET.REQUEST, action }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailEventProvider)
