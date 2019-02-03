import { delay } from "redux-saga"
import {
  call, select, takeLatest, put, take, race,
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
    } else {
      yield put({ type: UserStore.actions.GET.REQUEST, action: { id: "anon" } })
      console.log("JWT doesn't exist", jwt)
    }
  }

  * init() {
    yield call(this.getAuthenticatedUser)
    // try to retrieve auth user
    yield race({
      getUserSuccess: take(UserStore.actions.GET.SUCCESS),
      getUserFailure: take(UserStore.actions.GET.FAILURE),
      timeout: delay(3000),
    })
    // set timelines
    yield call(TimelinesStore.set)
  }

  * watchInit() {
    yield takeLatest(this.actions.INIT.REQUEST, this.init)
  }
}

export default new InitStore()
