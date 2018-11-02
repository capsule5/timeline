import { FETCH_EVENTS } from "./actionTypes"

const initialState = {
  data: [ { title: "initial" } ],
  isLoading: false,
  isError: false,
}

const events = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS.REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case FETCH_EVENTS.SUCCESS:
      return {
        ...state,
        data: action.response.data,
        isLoading: false,
        isError: false,
      }
    case FETCH_EVENTS.FAILURE:
      return {
        ...state,
        isError: true,
        isLoading: false,
      }
    default:
      return state
  }
}

export default events
