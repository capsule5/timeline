import { put, call, takeEvery } from "redux-saga/effects"
import { api } from "../../utils/api"
import { FETCH_EVENTS } from "./actionTypes"

function* fetchEvents() {
  const params = {
    method: "GET",
    endpoint: "events",
  }
  const response = yield call(api, params)
  if (response) {
    yield put({ type: FETCH_EVENTS.SUCCESS, response })
  } else {
    yield put({ type: FETCH_EVENTS.FAILURE, response })
  }
}

export function* watchFetchEvents() {
  yield takeEvery(FETCH_EVENTS.REQUEST, fetchEvents)
}
