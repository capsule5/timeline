import { put, call } from "redux-saga/effects"
import { api } from "../../utils/api"

export function* fetchEvents() {
  const params = {
    method: "GET",
    endpoint: "events",
  }
  const response = yield call(api, params)
  if (response) {
    yield put({ type: "FETCH_EVENTS_SUCCESS", response })
  } else {
    yield put({ type: "FETCH_EVENTS_ERROR", response })
  }
}
