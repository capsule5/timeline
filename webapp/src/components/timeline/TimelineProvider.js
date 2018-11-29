import React, { Component } from "react"
import { connect } from "react-redux"
import Timeline from "./Timeline"
import { EventsStore } from "../../redux/store"
import { groupByArray } from "../../utils/data"

const groupByDate = (events) => {
  const eventsByDate = {
    years: groupByArray(events, "date_year"),
  }

  const { years } = eventsByDate
  years.forEach((year) => {
    const values = groupByArray(year.values, "date_month")
    const groupWithNoKey = values.filter(v => !v.key)
    const groupWithKey = values.filter(v => v.key)
    year.values = {
      events: groupWithNoKey.length ? groupWithNoKey[0].values : null, // no months
      months: groupWithKey.length ? groupWithKey : null,
    }

    const { months } = year.values
    if (months) {
      months.forEach((month) => {
        const values = groupByArray(month.values, "date_day")
        const groupWithNoKey = values.filter(v => !v.key)
        const groupWithKey = values.filter(v => v.key)
        month.values = {
          events: groupWithNoKey.length ? groupWithNoKey[0].values : null, // no days
          days: groupWithKey.length ? groupWithKey : null,
        }

        const { days } = month.values
        if (days) {
          days.forEach((day) => {
            day.values = {
              events: day.values,
            }
          })
        }
      })
    }
  })
  return eventsByDate
}

class TimelineProvider extends Component {
  render() {
    const { events } = this.props
    const eventsByDate = groupByDate(events)
    return <Timeline eventsByDate={ eventsByDate } { ...this.props } />
  }
}

const mapStateToProps = state => ({
  events: state.events.data,
  selectedEventId: state.events.selected ? state.events.selected.id : null,
})

const mapDispatchToProps = dispatch => ({
  deleteEvent: action => dispatch({ type: EventsStore.actions.DELETE.REQUEST, action }),
  getEvent: action => dispatch({ type: EventsStore.actions.GET.REQUEST, action }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineProvider)
