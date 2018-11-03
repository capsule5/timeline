import { FETCH_EVENTS, CREATE_EVENT, DELETE_EVENT } from "./actionTypes"

const initialState = {
  data: [],
  isLoading: false,
}

const events = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS.REQUEST:
    case CREATE_EVENT.REQUEST:
    case DELETE_EVENT.REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case FETCH_EVENTS.SUCCESS:
      return {
        data: action.response.data,
        isLoading: false,
      }
    case CREATE_EVENT.SUCCESS:
    case DELETE_EVENT.SUCCESS:
    case FETCH_EVENTS.FAILURE:
    case CREATE_EVENT.FAILURE:
    case DELETE_EVENT.FAILURE:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}

export default events
