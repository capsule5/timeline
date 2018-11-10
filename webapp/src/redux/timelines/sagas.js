import {
  put, call, takeEvery, select,
} from "redux-saga/effects"
import { api } from "../../utils/api"
import {
  FETCH_TIMELINES, CREATE_TIMELINE, DELETE_TIMELINE, TOGGLE_TIMELINE,
} from "./actionTypes"
import { FETCH_EVENTS_BY_TIMELINES_IDS } from "../events/actionTypes"

function* callToAction({ params, actionType, isRefetch = false }) {
  const { response, error } = yield call(api, params)
  if (response) {
    yield put({ type: actionType.SUCCESS, response })
    if (isRefetch) yield put({ type: FETCH_TIMELINES.REQUEST })
  } else {
    yield put({ type: actionType.FAILURE, error })
  }
}

// FETCH
// -----------------------------

function* fetchTimelines() {
  const params = {
    method: "GET",
    endpoint: "timelines",
  }
  yield call(callToAction, { actionType: FETCH_TIMELINES, params })
}

export function* watchFetchTimelines() {
  yield takeEvery(FETCH_TIMELINES.REQUEST, fetchTimelines)
}

// // CREATE
// // -----------------------------

// function* createTimeline({ action }) {
//   const params = {
//     method: "POST",
//     endpoint: "timelines",
//     data: action,
//   }
//   yield call(callToAction, { actionType: CREATE_TIMELINE, params, isRefetch: true })
// }

// export function* watchCreateTimeline() {
//   yield takeEvery(CREATE_TIMELINE.REQUEST, createTimeline)
// }

// // DELETE
// // -----------------------------

// function* deleteTimeline({ action }) {
//   const params = {
//     method: "DELETE",
//     endpoint: `timelines/${action.id}`,
//   }
//   yield call(callToAction, { actionType: DELETE_TIMELINE, params, isRefetch: true })
// }

// export function* watchDeleteTimeline() {
//   yield takeEvery(DELETE_TIMELINE.REQUEST, deleteTimeline)
// }

// TOGGLE
// -----------------------------

function* toggleTimeline({ action: { id } }) {
  const state = yield select()
  const { selected } = state.timelines
  let newSelected

  if (selected.includes(id)) {
    newSelected = selected.filter(e => e !== id)
  } else {
    newSelected = selected.concat(id)
  }

  const response = {
    selected: newSelected,
  }

  yield put({ type: TOGGLE_TIMELINE.SUCCESS, response })
  yield put({ type: FETCH_EVENTS_BY_TIMELINES_IDS.REQUEST })
}

export function* watchToggleTimeline() {
  yield takeEvery(TOGGLE_TIMELINE.REQUEST, toggleTimeline)
}
