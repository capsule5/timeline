import { put, call } from "redux-saga/effects"
import axios from "axios"

const API_LOCAL = "http://192.168.0.11:3003/" // "http://localhost:3003/" //
const API_PROD = "http://46.101.243.149/api/"
const API_BASE_URL = process.env.NODE_ENV === "production" ? API_PROD : API_LOCAL

class BaseStore {
  constructor() {
    this.api = this.api.bind(this)
    this.callToAction = this.callToAction.bind(this)
  }

  createActions(actions) {
    return actions.reduce((obj, val) => {
      obj[val] = this.createRequestTypes(`${this.ref}_${val}`)
      return obj
    }, {})
  }

  createRequestTypes(base) {
    const status = [ "REQUEST", "SUCCESS", "FAILURE" ]
    return status.reduce((acc, type) => {
      acc[type] = `${base}_${type}`
      return acc
    }, {})
  }

  api({ method, endpoint, data = {} }) {
    return axios({
      url: `${API_BASE_URL}${endpoint}`,
      method,
      data,
    })
      .then((response) => {
        console.log("API success", method, endpoint, response.data)
        return { response }
      })
      .catch((error) => {
        console.log("API error", method, endpoint, error.response.data)
        return { error }
      })
  }

  * callToAction({ params, actionType }) {
    const { response, error } = yield call(this.api, params)
    if (response) {
      yield put({ type: actionType.SUCCESS, response })
    } else {
      yield put({ type: actionType.FAILURE, error })
    }
    return { response, error }
  }
}

export default BaseStore
