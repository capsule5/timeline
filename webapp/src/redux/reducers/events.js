const initialState = {
  data: [ { title: "initial" } ],
  isFetchLoading: false,
  isFetchError: false,
}

const events = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_EVENTS_REQUEST":
      return {
        ...state,
        isFetchLoading: true,
        isFetchError: false,
      }
    case "FETCH_EVENTS_SUCCESS":
      return {
        ...state,
        data: action.response.data,
        isFetchLoading: false,
        isFetchError: false,
      }
    case "FETCH_EVENTS_ERROR":
      return {
        ...state,
        isFetchError: true,
        isFetchLoading: false,
      }
    default:
      return state
  }
}

export default events
