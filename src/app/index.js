import React from "react"
import { applyMiddleware } from "redux"
import { render } from "react-dom"
import { Provider } from "react-redux"
import thunk from "redux-thunk"

import routes from "./routes"
import router from "./core/router"

const route = router(routes)

const App = route.connect()

export default () => render(
  <Provider store={route.getStore(applyMiddleware(thunk))}>
    <App />
  </Provider>, 
  document.getElementById("app")
)
