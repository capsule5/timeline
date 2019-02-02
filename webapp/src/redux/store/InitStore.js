import {
  call, select, takeLatest, put, take,
} from "redux-saga/effects"
import BaseStore from "./BaseStore"
import TimelinesStore from "./TimelinesStore"
import UserStore from "./UserStore"

class InitStore extends BaseStore {
  constructor() {
    super()
    this.ref = "STORE"
    this.actions = this.createActions([ "INIT" ])
    this.init = this.init.bind(this)
    this.getAuthenticatedUser = this.getAuthenticatedUser.bind(this)
  }

  * getAuthenticatedUser() {
    // get user id from local stored token
    const jwt = this.getTokenDecoded()
    if (jwt && jwt.id) {
      // get user
      yield put({ type: UserStore.actions.GET.REQUEST, action: { id: jwt.id } })
    }
  }

  * init() {
    yield call(this.getAuthenticatedUser)
    // fetch timelines
    yield put({ type: TimelinesStore.actions.FETCH.REQUEST })
    // wait for timelines
    yield take(TimelinesStore.actions.FETCH.SUCCESS)
    // get timelines
    const timelines = yield select(state => state.timelines.data)
    // toggle the first one
    if (timelines.length) {
      yield put({ type: TimelinesStore.actions.TOGGLE.REQUEST, action: { id: timelines[0].id } })
    }
  }

  * watchInit() {
    yield takeLatest(this.actions.INIT.REQUEST, this.init)
  }
}

export default new InitStore()
