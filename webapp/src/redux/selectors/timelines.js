import { createSelector } from "reselect"

const timelinesState = state => state.timelines

export const getAll = createSelector(
  [ timelinesState ],
  timelines => timelines.data
)

export const getSelected = createSelector(
  [ timelinesState ],
  timelines => timelines.selected
)
