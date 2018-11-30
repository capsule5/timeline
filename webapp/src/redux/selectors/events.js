import { createSelector } from "reselect"
import { groupByArray } from "../../utils/data"

const eventsState = state => state.events

export const getAll = createSelector(
  [ eventsState ],
  events => events.data
)

export const getSelected = createSelector(
  [ eventsState ],
  events => events.selected
)

export const getSelectedId = createSelector(
  [ getSelected ],
  selected => (selected ? selected.id : null)
)

export const getAllByDate = createSelector(
  [ getAll ],
  (events) => {
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
)
