import { put, call, takeEvery } from "redux-saga/effects"
import { api } from "../../utils/api"
import { FETCH_EVENTS, CREATE_EVENT, DELETE_EVENT } from "./actionTypes"

// FETCH
// -----------------------------

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

// CREATE
// -----------------------------

function* createEvent({ action }) {
  const params = {
    method: "POST",
    endpoint: "events",
    data: action,
  }
  const response = yield call(api, params)
  if (response) {
    yield put({ type: CREATE_EVENT.SUCCESS, response })
    yield put({ type: FETCH_EVENTS.REQUEST })
  } else {
    yield put({ type: CREATE_EVENT.FAILURE, response })
  }
}

export function* watchCreateEvent() {
  yield takeEvery(CREATE_EVENT.REQUEST, createEvent)
}

// DELETE
// -----------------------------

function* deleteEvent({ action }) {
  const params = {
    method: "DELETE",
    endpoint: `events/${action.id}`,
  }
  const response = yield call(api, params)
  if (response) {
    yield put({ type: DELETE_EVENT.SUCCESS, response })
    yield put({ type: FETCH_EVENTS.REQUEST })
  } else {
    yield put({ type: DELETE_EVENT.FAILURE, response })
  }
}

export function* watchDeleteEvent() {
  yield takeEvery(DELETE_EVENT.REQUEST, deleteEvent)
}
