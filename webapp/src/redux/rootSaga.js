import { all } from "redux-saga/effects"
import {
  watchFetchEvents,
  watchFetchEventsByTimelinesIds,
  watchCreateEvent,
  watchDeleteEvent,
} from "./events/sagas"

export default function* rootSaga() {
  yield all([
    watchFetchEvents(),
    watchFetchEventsByTimelinesIds(),
    watchCreateEvent(),
    watchDeleteEvent(),
  ])
}
