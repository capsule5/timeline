import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import rootReducer from "./rootReducer"
import rootSaga from "./rootSaga"

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
