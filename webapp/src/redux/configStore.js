import {
  createStore, applyMiddleware, combineReducers, compose,
} from "redux"
import createSagaMiddleware from "redux-saga"
import events from "./events/reducer"
import rootSaga from "./rootSaga"

// combine reducers
const rootReducer = combineReducers({
  events,
})

// middlewares
const sagaMiddleware = createSagaMiddleware()
const middlewares = [ sagaMiddleware ]

// dev tools enhancer
let composeEnhancers
if (process.env.NODE_ENV === "development") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose //eslint-disable-line
} else {
  composeEnhancers = compose
}

export default function configStore() {
  // create store
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)))

  // run saga
  sagaMiddleware.run(rootSaga)

  return store
}
