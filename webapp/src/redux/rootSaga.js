import { all } from "redux-saga/effects"
import { EventsStore, TimelinesStore } from "./store"

export default function* rootSaga() {
  yield all([
    EventsStore.watchFetch(),
    EventsStore.watchFetchByTimelinesIds(),
    EventsStore.watchCreate(),
    EventsStore.watchDelete(),
    TimelinesStore.watchFetch(),
    TimelinesStore.watchToggle(),
  ])
}
