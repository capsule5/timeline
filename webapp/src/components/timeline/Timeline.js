import React, { PureComponent } from "react"
import Event from "./event/Event"
import { formatMonth, formatDay } from "../../utils/date"
import "./Timeline.scss"

export default class Timeline extends PureComponent {
  getTimeUnit({ year, month, day }) {
    let timeUnit
    if (year) timeUnit = "year"
    else if (month) timeUnit = "month"
    else if (day) timeUnit = "day"
    return timeUnit
  }

  renderDate(date) {
    const { year, month, day } = date

    return (
      <div className={ `timeline__date timeline__date--${this.getTimeUnit(date)}` }>
        {year || formatMonth(month) || formatDay(day)}
      </div>
    )
  }

  renderEventsPerDate({
    dom, year, month, day, values,
  }) {
    const {
      deleteEvent, getEvent, selectedEventId, isShowSelected,
    } = this.props

    if (values.events) {
      const events = values.events.map(({ id, ...event }) => {
        const isSelected = isShowSelected && selectedEventId === id
        return (
          <Event
            { ...event }
            key={ `${id}` }
            id={ id }
            deleteEvent={ deleteEvent }
            getEvent={ getEvent }
            isSelected={ isSelected }
          />
        )
      })
      dom.push(
        <div className={ `timeline__group timeline__group--${this.getTimeUnit({ year, month, day })}` }>
          {this.renderDate({ year, month, day })}
          <div className="timeline__events">{events}</div>
        </div>
      )
    } else {
      dom.push(<div className="timeline__group">{this.renderDate({ year, month, day })}</div>)
    }

    return dom
  }

  renderTimeline() {
    const { eventsByDate } = this.props
    let dom = []
    // years
    eventsByDate.years.forEach((year) => {
      dom = this.renderEventsPerDate({ dom, year: year.key, values: year.values })
      // months
      if (year.values.months) {
        year.values.months.forEach((month) => {
          dom = this.renderEventsPerDate({ dom, month: month.key, values: month.values })
          // days
          if (month.values.days) {
            month.values.days.forEach((day) => {
              dom = this.renderEventsPerDate({ dom, day: day.key, values: day.values })
            })
          }
        })
      }
    })

    return dom
  }

  render() {
    const timeline = this.renderTimeline()
    return (
      <div className="timeline__wrapper">
        <div className="timeline__content">
          {timeline.length ? timeline : <div style={ { padding: 20 } }>No event to display, select a timeline!</div>}
        </div>
      </div>
    )
  }
}
