import React, { Component } from "react"
import "./Timeline.scss"
import { connect } from "react-redux"

class Timeline extends Component {
  componentWillMount() {
    const { fetchEvents } = this.props
    fetchEvents()
  }

  render() {
    const { events } = this.props
    return (
      <>
        <div className="events">
          {events.map(({ id, title }) => {
            return (
              <span key={ `${id}` } className="events__item">
                {title}
              </span>
            )
          })}
        </div>
      </>
    )
  }
}

// export default Timeline

const mapStateToProps = state => ({
  events: state.events.data,
})
const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch({ type: "FETCH_EVENTS_REQUEST" }),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline)
