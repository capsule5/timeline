import {
  call, takeEvery, takeLatest, select, put, take,
} from "redux-saga/effects"
import { BaseStore, EventsStore, UserStore } from "."
import { isAuthenticated, getAuthenticated } from "../selectors/user"

class TimelinesStore extends BaseStore {
  constructor() {
    super()
    this.ref = "TIMELINES"
    this.actions = this.createActions([ "FETCH", "CREATE", "DELETE", "TOGGLE", "FETCH_BY_USER_ID" ])
    this.initialState = {
      data: [],
      isLoading: false,
      selected: [],
    }
    this.baseEndpoint = "timelines"
    this.reducer = this.reducer.bind(this)
    this.fetch = this.fetch.bind(this)
    this.create = this.create.bind(this)
    this.delete = this.delete.bind(this)
    this.toggle = this.toggle.bind(this)
    this.fetchByUserId = this.fetchByUserId.bind(this)
    this.set = this.set.bind(this)
    this.selectFirst = this.selectFirst.bind(this)
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
      case actions.FETCH_BY_USER_ID.SUCCESS:
        return {
          ...state,
          data: response.data,
          isLoading: false,
          selected: [],
        }
      case actions.TOGGLE.SUCCESS:
        return {
          ...state,
          selected: response.selected,
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
    const { response } = yield call(this.callToAction, { actionType: this.actions.FETCH, params })
    if (response) {
      yield call(this.selectFirst)
    }
  }

  * watchFetch() {
    yield takeLatest(this.actions.FETCH.REQUEST, this.fetch)
  }

  // FETCH USER'S TIMELINES
  // -----------------------------
  * fetchByUserId({ action }) {
    const params = {
      method: "GET",
      endpoint: `${UserStore.baseEndpoint}/${action.id}/timelines`,
    }
    const { response } = yield call(this.callToAction, { actionType: this.actions.FETCH_BY_USER_ID, params })
    if (response) {
      yield call(this.selectFirst)
    }
  }

  * watchFetchByUserId() {
    yield takeLatest(this.actions.FETCH_BY_USER_ID.REQUEST, this.fetchByUserId)
  }

  // SET
  // -----------------------------
  * set() {
    const isAuth = yield select(state => isAuthenticated(state))
    if (isAuth) {
      const { id } = yield select(state => getAuthenticated(state))
      // fetch user's timelines
      yield put({ type: this.actions.FETCH_BY_USER_ID.REQUEST, action: { id } })
      // wait for timelines
      yield take(this.actions.FETCH_BY_USER_ID.SUCCESS)
    } else {
      // fetch public timelines
      yield put({ type: this.actions.FETCH.REQUEST })
      // wait for timelines
      yield take(this.actions.FETCH.SUCCESS)
    }
  }

  // SELECT FIRST
  // -----------------------------
  * selectFirst() {
    // get timelines from the store
    const { data, selected } = yield select(state => state.timelines)
    // toggle the first one if not already selected (if isPublic)
    if (data.length && !selected.includes(data[0].id)) {
      yield put({ type: this.actions.TOGGLE.REQUEST, action: { id: data[0].id } })
    }
  }

  // CREATE
  // -----------------------------
  * create({
    action: {
      values, setErrors, setSubmitting, onSuccess,
    },
  }) {
    const { id: usersId } = yield select(state => getAuthenticated(state))
    const params = {
      method: "POST",
      endpoint: this.baseEndpoint,
      data: Object.assign(values, { usersId, isPublic: 0 }),
    }
    const { response, error } = yield call(this.callToAction, { actionType: this.actions.CREATE, params })
    if (response) {
      yield call(onSuccess)
      yield call(this.set)
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
    if (response) yield call(this.set)
  }

  * watchDelete() {
    yield takeEvery(this.actions.DELETE.REQUEST, this.delete)
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
    yield put({ type: EventsStore.actions.FETCH_BY_TIMELINES_IDS.REQUEST })
  }

  * watchToggle() {
    yield takeEvery(this.actions.TOGGLE.REQUEST, this.toggle)
  }
}

export default new TimelinesStore()
