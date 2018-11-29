import {
  call, takeEvery, takeLatest, select, put,
} from "redux-saga/effects"
import BaseStore from "./BaseStore"
import { TimelinesStore } from "."

class EventsStore extends BaseStore {
  constructor() {
    super()
    this.ref = "EVENTS"
    this.actions = this.createActions([ "FETCH", "CREATE", "DELETE", "FETCH_BY_TIMELINES_IDS", "GET" ])
    this.initialState = {
      data: [],
      isLoading: false,
      selected: null,
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
      case actions.CREATE.SUCCESS:
      case actions.DELETE.SUCCESS:
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
  * create({ action }) {
    const params = {
      method: "POST",
      endpoint: this.baseEndpoint,
      data: action,
    }
    const { response } = yield call(this.callToAction, { actionType: this.actions.CREATE, params })
    if (response) {
      // refetch events
      yield put({ type: this.actions.FETCH_BY_TIMELINES_IDS.REQUEST })
      // refetch timelines
      yield put({ type: TimelinesStore.actions.FETCH.REQUEST })
    }
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
    const params = {
      method: "GET",
      endpoint: `${this.baseEndpoint}/${action.id}`,
    }
    yield call(this.callToAction, { actionType: this.actions.GET, params })
  }

  * watchGet() {
    yield takeEvery(this.actions.GET.REQUEST, this.get)
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
