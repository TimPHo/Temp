import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { useRouterHistory } from 'react-router'
import { createHistory } from 'history'
import makeRoutes from './routes'
import Root from './containers/Root'
import configureStore from './redux/configureStore'
import {loginSuccess} from './redux/modules/auth'

const historyConfig = { basename: __BASENAME__ }
const history = useRouterHistory(createHistory)(historyConfig)

const initialState = window.__INITIAL_STATE__
const store = configureStore({ initialState, history })

const routes = makeRoutes(store)

let token = localStorage.getItem('token')
let username = localStorage.getItem('username')
if (token !== null) {
  store.dispatch(loginSuccess(token, username))
}

// Render the React application to the DOM
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
)
