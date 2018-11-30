import React, { Component } from "react"
import { connect } from "react-redux"
import DetailEvent from "./DetailEvent"
import { eventsSelector } from "../../redux/selectors"

class DetailEventProvider extends Component {
  render() {
    const { selected } = this.props
    return selected && <DetailEvent { ...selected } />
  }
}

const mapStateToProps = state => ({
  selected: eventsSelector.getSelected(state),
})

export default connect(
  mapStateToProps,
  null
)(DetailEventProvider)
