import { combineReducers } from "redux"
import { EventsStore, TimelinesStore, UserStore } from "./store"

const rootReducer = combineReducers({
  events: EventsStore.reducer,
  timelines: TimelinesStore.reducer,
  user: UserStore.reducer,
})

export default rootReducer
