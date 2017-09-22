import axios from 'axios'
import {BASE_URL} from '../config'

export const registerUser = user => dispatch => {
  axios.post(`${BASE_URL}/user/register`, {
    user
  })
  .then(res => {
    if(res.data.err){
      dispatch(registerErr(res.data.err))
    }
    else {
      return
    }
  })
}

export const REGISTER_ERR = 'REGISTER_ERR'
export const registerErr = err => ({
  type: REGISTER_ERR,
  err
})

export const logInUser = user => dispatch => {
  axios.post(`${BASE_URL}/user/login`, {
    user
  })
  .then(res => {
    if(res.data.err){
      dispatch(logInErr(res.data.err))
    }
    else {
      return
    }
  })
}

export const LOGIN_ERR = 'LOGIN_ERR'
export const logInErr = err => ({
  type: LOGIN_ERR,
  err
})
