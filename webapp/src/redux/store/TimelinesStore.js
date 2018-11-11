import {
  call, takeEvery, select, put,
} from "redux-saga/effects"
import BaseStore from "./BaseStore"
import Events from "./EventsStore"

class TimelinesStore extends BaseStore {
  constructor() {
    super()
    this.ref = "TIMELINES"
    this.actions = this.createActions([ "FETCH", "CREATE", "DELETE", "TOGGLE" ])
    this.initialState = {
      data: [],
      isLoading: false,
      selected: [ 1 ],
    }
    this.baseEndpoint = "timelines"
    this.reducer = this.reducer.bind(this)
    this.fetch = this.fetch.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  reducer(state = this.initialState, action) {
    const { type, response } = action
    const { actions } = this

    switch (type) {
      case actions.FETCH.REQUEST:
      case actions.CREATE.REQUEST:
      case actions.DELETE.REQUEST:
        return {
          ...state,
          isLoading: true,
        }
      case actions.FETCH.SUCCESS:
        return {
          ...state,
          data: response.data,
          isLoading: false,
        }
      case actions.CREATE.SUCCESS:
      case actions.DELETE.SUCCESS:
      case actions.FETCH.FAILURE:
      case actions.CREATE.FAILURE:
      case actions.DELETE.FAILURE:
        return {
          ...state,
          isLoading: false,
        }
      case actions.TOGGLE.SUCCESS:
        return {
          ...state,
          selected: response.selected,
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

  // TOGGLE
  // -----------------------------

  * toggle({ action: { id } }) {
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

    yield put({ type: this.actions.TOGGLE.SUCCESS, response })
    yield put({ type: Events.actions.FETCH_BY_TIMELINES_IDS.REQUEST })
  }

  * watchToggle() {
    yield takeEvery(this.actions.TOGGLE.REQUEST, this.toggle)
  }
}

export default new TimelinesStore()