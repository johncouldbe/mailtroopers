import axios from 'axios'
import jwtDecode from 'jwt-decode'
import {BASE_URL} from '../config'
import {saveAuthToken, clearAuthToken} from '../local-storage'
import {hookInSocket} from './io'

import {getCampaigns} from './email'

// Stores the auth token in state and localStorage, and decodes and stores
// the user data stored in the token
const storeAuthInfo = (authToken, dispatch) => {
  const decodedToken = jwtDecode(authToken)
  saveAuthToken(authToken)
  dispatch(setAuthToken(authToken))
  dispatch(setCurrentUser(decodedToken.user))
  dispatch(getCampaigns(decodedToken.user._id))
  dispatch(hookInSocket(authToken))
}

export const registerUser = user => dispatch => {
  return axios.post(`${BASE_URL}/user/register`, {
    user
  })
  .then(res => {
    if(res.data.err){
      dispatch(registerErr(res.data.err))
    }
  })
}

export const REGISTER_ERR = 'REGISTER_ERR'
export const registerErr = err => ({
  type: REGISTER_ERR,
  err
})

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN'
export const setAuthToken = authToken => ({
    type: SET_AUTH_TOKEN,
    authToken
})

export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const setCurrentUser = currentUser => ({
    type: SET_CURRENT_USER,
    currentUser
})

export const logInUser = (email, password) => dispatch => {
  const token = btoa(`${email}:${password}`)
  axios({
    url: `${BASE_URL}/auth/login`,
    method: 'post',
    headers: {
      Authorization: `Basic ${token}`
    }
  })
  .then(res => {
    const authToken = res.data.authToken
    storeAuthInfo(authToken, dispatch)
  })
  .catch(err => {
    console.log(err);
    dispatch(logInErr('Incorrect username or password'))
  })
}

export const LOGIN_ERR = 'LOGIN_ERR'
export const logInErr = err => ({
  type: LOGIN_ERR,
  err
})

export const refreshAuthToken = () => (dispatch, getState) => {
  const authToken = getState().user.authToken
  return axios(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        // Provide our existing token as credentials to get a new one
        Authorization: `Bearer ${authToken}`
      }
    })
    .then(res => {
      storeAuthInfo(res.data.authToken, dispatch)
    })
    .catch(err => {
        // We couldn't get a refresh token because our current credentials
        // are invalid or expired, so clear them and sign us out
        dispatch(setCurrentUser(null));
        dispatch(setAuthToken(null));
        clearAuthToken(authToken);
    });
};
