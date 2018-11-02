import { all } from "redux-saga/effects"
import { watchFetchEvents } from "./events/sagas"

export default function* rootSaga() {
  yield all([ watchFetchEvents() ])
}
