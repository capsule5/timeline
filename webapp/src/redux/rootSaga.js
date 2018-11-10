import { all } from "redux-saga/effects"
import {
  watchFetchEvents, watchFetchEventsByTimelinesIds, watchCreateEvent, watchDeleteEvent,
} from "./events/sagas"
import {
  watchFetchTimelines, watchToggleTimeline,
} from "./timelines/sagas"

export default function* rootSaga() {
  yield all([
    watchFetchEvents(),
    watchFetchEventsByTimelinesIds(),
    watchCreateEvent(),
    watchDeleteEvent(),
    watchFetchTimelines(),
    watchToggleTimeline(),
  ])
}
