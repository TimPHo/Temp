import { combineReducers } from 'redux'
import { routeReducer as router } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import counter from './modules/counter'
import auth from './modules/auth'

export default combineReducers({
  counter,
  router,
  form: formReducer,
  auth
})
