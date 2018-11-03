import { all } from "redux-saga/effects"
import {
  watchFetchEvents,
  watchCreateEvent,
  watchDeleteEvent,
} from "./events/sagas"

export default function* rootSaga() {
  yield all([
    watchFetchEvents(),
    watchCreateEvent(),
    watchDeleteEvent(),
  ])
}
