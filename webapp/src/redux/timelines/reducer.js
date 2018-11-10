import {
  FETCH_TIMELINES, CREATE_TIMELINE, DELETE_TIMELINE, TOGGLE_TIMELINE,
} from "./actionTypes"

const initialState = {
  data: [],
  isLoading: false,
  selected: [],
}

const timelines = (state = initialState, action) => {
  const { type, response } = action

  switch (type) {
    case FETCH_TIMELINES.REQUEST:
    case CREATE_TIMELINE.REQUEST:
    case DELETE_TIMELINE.REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case FETCH_TIMELINES.SUCCESS:
      return {
        ...state,
        data: response.data,
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
    case TOGGLE_TIMELINE.SUCCESS:
      return {
        ...state,
        selected: response.selected,
      }
    default:
      return state
  }
}

export default timelines
