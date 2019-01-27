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

export const isShowSelected = createSelector(
  [ eventsState ],
  events => events.isShowSelected
)

export const getAllByDate = createSelector(
  [ getAll ], (events) => {
    const getGroup = (arr, key) => {
      const values = groupByArray(arr, key)
      const groupWithKey = values.filter(v => v.key)
      const groupWithNoKey = values.filter(v => !v.key)
      const withKey = groupWithKey.length ? groupWithKey : null
      const withNoKey = groupWithNoKey.length ? groupWithNoKey[0].values : null
      return {
        withKey,
        withNoKey,
      }
    }

    const eventsByDate = {
      years: groupByArray(events, "dateYear"),
    }

    const { years } = eventsByDate
    years.forEach((year) => {
      const groupByMonths = getGroup(year.values, "dateMonth")
      year.values = {
        events: groupByMonths.withNoKey, // no months
        months: groupByMonths.withKey,
      }

      const { months } = year.values
      if (months) {
        months.forEach((month) => {
          const groupByDays = getGroup(month.values, "dateDay")
          month.values = {
            events: groupByDays.withNoKey, // no days
            days: groupByDays.withKey,
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

export const getFirstId = createSelector([ getAll ], (events) => {
  return events.length ? events[0].id : null
})


