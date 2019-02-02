import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
// import * as serviceWorker from "./serviceWorker"
import { Provider } from "react-redux"
import initReactFastclick from "react-fastclick"
import { InitStore } from "./redux/store"
import AppProvider from "./components/AppProvider"
import configStore from "./redux/configStore"

initReactFastclick()

const store = configStore()
store.dispatch({ type: InitStore.actions.INIT.REQUEST })

ReactDOM.render(
  <Provider store={ store }>
    <AppProvider />
  </Provider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister()
