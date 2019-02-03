import { all } from "redux-saga/effects"
import {
  EventsStore, TimelinesStore, UserStore, InitStore,
} from "./store"

export default function* rootSaga() {
  yield all([
    InitStore.watchInit(),
    EventsStore.watchFetch(),
    EventsStore.watchFetchByTimelinesIds(),
    EventsStore.watchCreate(),
    EventsStore.watchDelete(),
    EventsStore.watchGet(),
    TimelinesStore.watchFetch(),
    TimelinesStore.watchCreate(),
    TimelinesStore.watchDelete(),
    TimelinesStore.watchToggle(),
    TimelinesStore.watchFetchByUserId(),
    UserStore.watchCreate(),
    UserStore.watchLogin(),
    UserStore.watchLogout(),
    UserStore.watchGet(),
  ])
}
