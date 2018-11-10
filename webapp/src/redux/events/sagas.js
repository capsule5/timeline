import { put, call, takeEvery } from "redux-saga/effects"
import { api } from "../../utils/api"
import {
  FETCH_EVENTS, CREATE_EVENT, DELETE_EVENT, FETCH_EVENTS_BY_TIMELINES_IDS,
} from "./actionTypes"

function* callToAction({ params, actionType, isRefetch = false }) {
  const { response, error } = yield call(api, params)
  if (response) {
    yield put({ type: actionType.SUCCESS, response })
    if (isRefetch) yield put({ type: FETCH_EVENTS.REQUEST })
  } else {
    yield put({ type: actionType.FAILURE, error })
  }
}

// FETCH
// -----------------------------

function* fetchEvents() {
  console.warn("[stab]", "fetchEvents")
  const params = {
    method: "GET",
    endpoint: "events",
  }
  yield call(callToAction, { actionType: FETCH_EVENTS, params })
}

export function* watchFetchEvents() {
  yield takeEvery(FETCH_EVENTS.REQUEST, fetchEvents)
}

// FETCH BY TIMELINES IDS
// -----------------------------

function* fetchEventsByTimelinesIds({ action }) {
  console.warn("[stab]", "fetchEventsByTimelinesIds", { action })
  const params = {
    method: "GET",
    endpoint: `events/timelines?ids=${JSON.stringify(action)}`,
    data: action,
  }
  yield call(callToAction, { actionType: FETCH_EVENTS, params })
}

export function* watchFetchEventsByTimelinesIds() {
  yield takeEvery(FETCH_EVENTS_BY_TIMELINES_IDS.REQUEST, fetchEventsByTimelinesIds)
}

// CREATE
// -----------------------------

function* createEvent({ action }) {
  const params = {
    method: "POST",
    endpoint: "events",
    data: action,
  }
  yield call(callToAction, { actionType: CREATE_EVENT, params, isRefetch: true })
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
  yield call(callToAction, { actionType: DELETE_EVENT, params, isRefetch: true })
}

export function* watchDeleteEvent() {
  yield takeEvery(DELETE_EVENT.REQUEST, deleteEvent)
}
