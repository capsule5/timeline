import { createRequestTypes } from "../utils"

export const FETCH_EVENTS = createRequestTypes("FETCH_EVENTS")
export const FETCH_EVENTS_BY_TIMELINES_IDS = createRequestTypes("FETCH_EVENTS_BY_TIMELINES_IDS")
export const CREATE_EVENT = createRequestTypes("CREATE_EVENT")
export const DELETE_EVENT = createRequestTypes("DELETE_EVENT")
