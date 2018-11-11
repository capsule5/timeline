import { combineReducers } from "redux"
import { EventsStore, TimelinesStore } from "./store"

const rootReducer = combineReducers({
  events: EventsStore.reducer,
  timelines: TimelinesStore.reducer,
})

export default rootReducer
