import {loginExpired} from 'redux/modules/auth'
import { routeActions } from 'react-router-redux'
// ------------------------------------
// Actions
// ------------------------------------
export const apiCallPost = (path, values) => {
  return (dispatch, getState) => {
    return postToApi(path, values, getState().auth.token).then(response => verifySuccess(response, dispatch))
  }
}

export const apiCallGet = (path) => {
  return (dispatch, getState) => {
    return getApi(path, getState().auth.token).then(response => verifySuccess(response, dispatch))
  }
}

let verifySuccess = (response, dispatch) => {
  if (response.status === 401) {
    // Access Denied
    dispatch(loginExpired())
    dispatch(routeActions.push('/Login'))
  }
  return Promise.all([response, response.json()])
}

function getApi (path, token) {
  return fetch(`https://localhost:44300/${path}`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `bearer ${token}`
    }
  })
}

function postToApi (path, values, token) {
  return fetch(`https://localhost:44300/${path}`, {
    method: 'post',
    body: JSON.stringify(values),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `bearer ${token}`
    }
  }).then(response => Promise.all([response, response.json()]))
}
