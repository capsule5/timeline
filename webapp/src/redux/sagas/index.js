
import { takeEvery, all } from "redux-saga/effects"
import { fetchEvents } from "./events"

function* watchFetchEvents() {
  yield takeEvery("FETCH_EVENTS_REQUEST", fetchEvents)
}

export default function* rootSaga() {
  yield all([ watchFetchEvents() ])
}
