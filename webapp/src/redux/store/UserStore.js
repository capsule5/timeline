import { call, takeLatest, put } from "redux-saga/effects"
import { BaseStore, TimelinesStore, EventsStore } from "."

class UserStore extends BaseStore {
  constructor() {
    super()
    this.ref = "USER"
    this.actions = this.createActions([ "REGISTER", "LOGIN", "LOGOUT", "GET" ])
    this.initialState = {
      isLoading: false,
      authenticated: {},
    }
    this.baseEndpoint = "users"
    this.reducer = this.reducer.bind(this)
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.get = this.get.bind(this)
  }

  reducer(state = this.initialState, action) {
    const { actions } = this
    switch (action.type) {
      case actions.REGISTER.REQUEST:
      case actions.LOGIN.REQUEST:
      case actions.LOGOUT.REQUEST:
      case actions.GET.REQUEST:
        return {
          ...state,
          isLoading: true,
        }
      case actions.REGISTER.SUCCESS:
      case actions.LOGIN.SUCCESS:
      case actions.GET.SUCCESS:
        return {
          ...state,
          authenticated: action.response.data.user,
          isLoading: false,
        }
      case actions.LOGOUT.SUCCESS:
        return {
          ...state,
          authenticated: {},
          isLoading: false,
        }

      case actions.REGISTER.FAILURE:
      case actions.LOGIN.FAILURE:
      case actions.LOGOUT.FAILURE:
      case actions.GET.FAILURE:
        return {
          ...state,
          isLoading: false,
        }
      default:
        return state
    }
  }

  // REGISTER
  // -----------------------------
  * register({
    action: {
      values, onSuccess, setErrors, setSubmitting,
    },
  }) {
    const params = {
      method: "POST",
      endpoint: "register",
      data: values,
    }
    const { response, error } = yield call(this.callToAction, { actionType: this.actions.REGISTER, params })
    if (response) {
      this.storeToken(response.data.token)
      yield call(onSuccess)
      yield put({ type: EventsStore.actions.CLEAR.REQUEST })
      yield call(TimelinesStore.set)
    } else {
      yield call(setErrors, { fromApi: error.response.data })
    }
    yield call(setSubmitting, false)
  }

  * watchCreate() {
    yield takeLatest(this.actions.REGISTER.REQUEST, this.register)
  }

  // LOGIN
  // -----------------------------
  * login({
    action: {
      values, onSuccess, setErrors, setSubmitting,
    },
  }) {
    const params = {
      method: "POST",
      endpoint: "login",
      data: values,
    }
    const { response, error } = yield call(this.callToAction, { actionType: this.actions.LOGIN, params })
    if (response) {
      this.storeToken(response.data.token)
      yield call(onSuccess)
      yield call(TimelinesStore.set)
    } else {
      yield call(setErrors, { fromApi: error.response.data })
    }
    yield call(setSubmitting, false)
  }

  * watchLogin() {
    yield takeLatest(this.actions.LOGIN.REQUEST, this.login)
  }

  // LOGOUT
  // -----------------------------
  * logout() {
    // const params = {
    //   method: "POST",
    //   endpoint: "logout",
    // }
    // const { response } = yield call(this.callToAction, { actionType: this.actions.LOGOUT, params })
    yield call(this.removeToken)
    // yield call(this.storeToken, "false")
    // yield put({ type: this.actions.LOGOUT.SUCCESS })
    window.location.reload()
  }

  * watchLogout() {
    yield takeLatest(this.actions.LOGOUT.REQUEST, this.logout)
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
    yield takeLatest(this.actions.GET.REQUEST, this.get)
  }
}

export default new UserStore()
