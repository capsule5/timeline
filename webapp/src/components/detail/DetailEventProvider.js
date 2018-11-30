import React, { Component } from "react"
import { connect } from "react-redux"
import DetailEvent from "./DetailEvent"
import { events } from "../../redux/selectors"

class DetailEventProvider extends Component {
  render() {
    const { selected } = this.props
    return selected && <DetailEvent { ...selected } />
  }
}

const mapStateToProps = state => ({
  selected: events.getSelected(state),
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailEventProvider)
