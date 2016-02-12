import fetch from 'isomorphic-fetch'
import {apiCallGet} from './api'
/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGIN_FETCH = 'LOGIN_FETCH'
export const LOGIN_EXPIRED = 'LOGIN_EXPIRED'

function loginRequest () {
  return {
    type: LOGIN_REQUEST
  }
}

function loginFailed () {
  return {
    type: LOGIN_FAILED
  }
}

export function loginExpired () {
  return {
    type: LOGIN_EXPIRED
  }
}

export function loginSuccess (token, username) {
  localStorage.setItem('token', token)
  localStorage.setItem('username', username)
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token: token,
      username: username
    }
  }
}

function saveValues (json) {
  return {
    type: LOGIN_FETCH,
    payload: {
      stuff: json
    }
  }
}

function postToApi (values) {
  return fetch(`https://localhost:44300/Token`, {
    method: 'post',
    body: `grant_type=password&username=${values.username}&password=${values.password}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }).then(response => Promise.all([response, response.json()]))
}

// ------------------------------------
// Actions
// ------------------------------------
export const login = (values) => {
  return (dispatch, getState) => {
    dispatch(loginRequest())
    return new Promise((resolve, reject) => {
      postToApi({grant_type: 'password', ...values})
        .then(([ response, json ]) => {
          if (response.status === 200) {
            dispatch(loginSuccess(json.access_token, json.userName))
            dispatch(apiCallGet('api/values')).then(([ response, json ]) => {
              if (response.status === 200) {
                dispatch(saveValues(json))
              }
            })
            resolve()
          } else if (response.status === 400) {
            reject({_error: 'Incorrect username or password'})
          } else {
            throw (new Error('Something went horribly wrong!'))
          }
        })
        .catch(error => {
          // Otherwise unhandled server error
          dispatch(loginFailed())
          reject({ _error: error.message })
        })
    })
  }
}

export const actions = {
  login
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {token: '', username: '', expired: false}
export default function authReducer (state = initialState, action: Action): Object {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        token: action.payload.token,
        username: action.payload.username,
        expired: false
      })
    case LOGIN_FAILED:
      return Object.assign({}, state, {
        token: '',
        username: '',
        expired: false
      })
    case LOGIN_FETCH:
      return Object.assign({}, state, {
        stuff: action.payload.stuff
      })
    case LOGIN_EXPIRED:
      return Object.assign({}, state, {
        token: '',
        username: '',
        expired: true
      })
    default:
      return state
  }
}
