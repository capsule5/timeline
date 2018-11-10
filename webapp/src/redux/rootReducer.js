import { combineReducers } from "redux"
import events from "./events/reducer"
import timelines from "./timelines/reducer"

const rootReducer = combineReducers({
  events, timelines,
})

export default rootReducer
