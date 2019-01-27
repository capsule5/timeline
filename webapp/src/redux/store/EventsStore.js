import {
  call, takeEvery, takeLatest, select, put,
} from "redux-saga/effects"
import BaseStore from "./BaseStore"
import { TimelinesStore } from "."

class EventsStore extends BaseStore {
  constructor() {
    super()
    this.ref = "EVENTS"
    this.actions = this.createActions([ "FETCH", "CREATE", "DELETE", "FETCH_BY_TIMELINES_IDS", "GET", "TOGGLE_SELECTED" ])
    this.initialState = {
      data: [],
      isLoading: false,
      selected: null,
      isShowSelected: false,
    }
    this.baseEndpoint = "events"
    this.reducer = this.reducer.bind(this)
    this.fetchByTimelinesIds = this.fetchByTimelinesIds.bind(this)
    this.fetch = this.fetch.bind(this)
    this.create = this.create.bind(this)
    this.delete = this.delete.bind(this)
    this.get = this.get.bind(this)
  }

  reducer(state = this.initialState, action) {
    const { actions } = this
    switch (action.type) {
      case actions.FETCH.REQUEST:
      case actions.FETCH_BY_TIMELINES_IDS.REQUEST:
      case actions.CREATE.REQUEST:
      case actions.DELETE.REQUEST:
      case actions.GET.REQUEST:
        return {
          ...state,
          isLoading: true,
        }
      case actions.TOGGLE_SELECTED.REQUEST:
        return {
          ...state,
          isShowSelected: !state.isShowSelected,
        }
      case actions.FETCH.SUCCESS:
      case actions.FETCH_BY_TIMELINES_IDS.SUCCESS:
        return {
          ...state,
          data: action.response.data,
          isLoading: false,
        }
      case actions.GET.SUCCESS:
        return {
          ...state,
          selected: action.response.data,
          isLoading: false,
        }
      case actions.DELETE.SUCCESS:
        // since we delete from the selected event
        return {
          ...state,
          selected: null,
          isShowSelected: false,
          isLoading: false,
        }
      case actions.CREATE.SUCCESS:
      case actions.FETCH.FAILURE:
      case actions.FETCH_BY_TIMELINES_IDS.FAILURE:
      case actions.CREATE.FAILURE:
      case actions.DELETE.FAILURE:
      case actions.GET.FAILURE:
        return {
          ...state,
          isLoading: false,
        }
      default:
        return state
    }
  }

  // FETCH
  // -----------------------------
  * fetch() {
    const params = {
      method: "GET",
      endpoint: this.baseEndpoint,
    }
    yield call(this.callToAction, { actionType: this.actions.FETCH, params })
  }

  * watchFetch() {
    yield takeEvery(this.actions.FETCH.REQUEST, this.fetch)
  }

  // CREATE
  // -----------------------------
  * create({
    action: {
      values, setErrors, setSubmitting, onSuccess,
    },
  }) {
    const params = {
      method: "POST",
      endpoint: this.baseEndpoint,
      data: values,
    }
    const { response, error } = yield call(this.callToAction, { actionType: this.actions.CREATE, params })
    if (response) {
      yield call(onSuccess)
      // refetch events
      yield put({ type: this.actions.FETCH_BY_TIMELINES_IDS.REQUEST })
      // refetch timelines
      yield put({ type: TimelinesStore.actions.FETCH.REQUEST })
    } else {
      yield call(setErrors, { fromApi: error.response.data })
    }
    yield call(setSubmitting, false)
  }

  * watchCreate() {
    yield takeEvery(this.actions.CREATE.REQUEST, this.create)
  }

  // DELETE
  // -----------------------------
  * delete({ action }) {
    const params = {
      method: "DELETE",
      endpoint: `${this.baseEndpoint}/${action.id}`,
    }
    const { response } = yield call(this.callToAction, { actionType: this.actions.DELETE, params })
    if (response) {
      // refetch events
      yield put({ type: this.actions.FETCH_BY_TIMELINES_IDS.REQUEST })
      // refetch timelines
      yield put({ type: TimelinesStore.actions.FETCH.REQUEST })
    }
  }

  * watchDelete() {
    yield takeEvery(this.actions.DELETE.REQUEST, this.delete)
  }

  // GET
  // -----------------------------
  * get({ action }) {
    const state = yield select()
    const { selected, isShowSelected } = state.events
    if (!selected || (selected && selected.id !== action.id)) {
      const params = {
        method: "GET",
        endpoint: `${this.baseEndpoint}/${action.id}`,
      }
      const { response } = yield call(this.callToAction, { actionType: this.actions.GET, params })
      if (response && !isShowSelected) {
        yield put({ type: this.actions.TOGGLE_SELECTED.REQUEST })
      }
    } else {
      yield put({ type: this.actions.TOGGLE_SELECTED.REQUEST })
    }
  }

  * watchGet() {
    yield takeLatest(this.actions.GET.REQUEST, this.get)
  }

  // FETCH BY TIMELINES IDS
  // -----------------------------
  * fetchByTimelinesIds() {
    const state = yield select()
    const { selected } = state.timelines
    const params = {
      method: "GET",
      endpoint: `${this.baseEndpoint}/timelines?ids=${JSON.stringify(selected)}`,
    }
    yield call(this.callToAction, { actionType: this.actions.FETCH_BY_TIMELINES_IDS, params })
  }

  * watchFetchByTimelinesIds() {
    yield takeLatest(this.actions.FETCH_BY_TIMELINES_IDS.REQUEST, this.fetchByTimelinesIds)
  }
}

export default new EventsStore()
