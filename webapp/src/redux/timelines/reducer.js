import { FETCH_TIMELINES, CREATE_TIMELINE, DELETE_TIMELINE } from "./actionTypes"

const initialState = {
  data: [],
  isLoading: false,
}

const timelines = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TIMELINES.REQUEST:
    case CREATE_TIMELINE.REQUEST:
    case DELETE_TIMELINE.REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case FETCH_TIMELINES.SUCCESS:
      return {
        data: action.response.data,
        isLoading: false,
      }
    case CREATE_TIMELINE.SUCCESS:
    case DELETE_TIMELINE.SUCCESS:
    case FETCH_TIMELINES.FAILURE:
    case CREATE_TIMELINE.FAILURE:
    case DELETE_TIMELINE.FAILURE:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}

export default timelines
